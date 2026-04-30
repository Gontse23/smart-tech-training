import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { requireAdmin, requireAuth, signToken } from "./auth.js";
import { initializeDatabase, publicUser, readDb, uid, writeDb } from "./db.js";
import { calculateProgress, enrichCourse, getCourseGate } from "./learning.js";

initializeDatabase();

const app = express();
const port = Number(process.env.PORT || 4000);
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json({ limit: "1mb" }));

function findCourse(db, courseId) {
  return db.courses.find((course) => course.id === courseId);
}

function getUserProgress(db, userId, courseId) {
  return db.progress.find((record) => record.userId === userId && record.courseId === courseId);
}

function findQuizContext(db, quizId) {
  const quiz = db.quizzes.find((candidate) => candidate.id === quizId);
  if (!quiz) return { quiz: null, course: null, chapter: null };
  const course = findCourse(db, quiz.courseId);
  const chapter = course?.chapters.find((candidate) => candidate.id === quiz.chapterId) || null;
  return { quiz, course, chapter };
}

function dashboardForUser(db, user) {
  const userProgress = db.progress.filter((record) => record.userId === user.id);
  const activeProgress = userProgress[0] || null;
  const activeCourse = activeProgress ? findCourse(db, activeProgress.courseId) : db.courses[0];
  const activeCalculated = activeProgress ? calculateProgress(activeCourse, activeProgress) : null;
  const quizAttempts = db.quizAttempts
    .filter((attempt) => attempt.userId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return {
    user: publicUser(user),
    currentCourse: activeCourse
      ? {
          id: activeCourse.id,
          title: activeCourse.title,
          duration: activeCourse.duration,
          difficulty: activeCourse.difficulty,
          progressPercent: activeCalculated?.percent || 0,
          completedChapters: activeCalculated?.completedChapters.map((chapter) => chapter.title) || [],
          nextLesson: activeCalculated?.nextLesson || null,
          nextChapter: activeCalculated?.nextChapter?.title || null,
          estimatedCompletion: activeCalculated?.percent >= 75 ? "4-6 weeks" : "10-14 weeks"
        }
      : null,
    upcomingTopics: activeCalculated?.nextChapter?.topics || [],
    quizScores: quizAttempts.slice(0, 5).map((attempt) => ({
      ...attempt,
      quizTitle: db.quizzes.find((quiz) => quiz.id === attempt.quizId)?.title || "Quiz"
    })),
    certificationTracks: db.certificationTracks || [],
    roadmap: db.roadmapMonths,
    recommendedNextStep:
      activeCalculated?.nextLesson?.type === "quiz"
        ? "Pass the chapter quiz to unlock the next roadmap checkpoint."
        : activeCalculated?.nextLesson
          ? `Continue with ${activeCalculated.nextLesson.title}.`
          : "Choose your next specialization course."
  };
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, name: "Smart Tech Training API" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find((candidate) => candidate.email.toLowerCase() === String(email || "").toLowerCase());

  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  user.lastActiveAt = new Date().toISOString();
  writeDb(db);
  res.json({ token: signToken(user), user: publicUser(user) });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const db = readDb();

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  if (db.users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ message: "A user with that email already exists." });
  }

  const user = {
    id: uid("user"),
    name,
    email,
    role: "learner",
    planId: "starter",
    passwordHash: await bcrypt.hash(password, 10),
    joinedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    profile: {
      title: "New Smart Tech learner",
      city: "",
      goal: "Become job ready with practical tech skills"
    }
  };

  db.users.push(user);
  db.progress.push({
    userId: user.id,
    courseId: "course-data-analyst-roadmap",
    enrolledAt: new Date().toISOString(),
    currentLessonId: "lesson-what-is-data-analysis",
    completedLessons: [],
    completedQuizzes: [],
    updatedAt: new Date().toISOString()
  });
  writeDb(db);

  res.status(201).json({ token: signToken(user), user: publicUser(user) });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.publicUser });
});

app.get("/api/bootstrap", (req, res) => {
  const db = readDb();
  res.json({
    pricingPlans: db.pricingPlans,
    roadmapMonths: db.roadmapMonths,
    courses: db.courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      duration: course.duration,
      difficulty: course.difficulty,
      level: course.level,
      category: course.category,
      accent: course.accent,
      icon: course.icon,
      chapterCount: course.chapters.length
    }))
  });
});

app.get("/api/dashboard", requireAuth, (req, res) => {
  const db = readDb();
  res.json(dashboardForUser(db, req.user));
});

app.put("/api/profile", requireAuth, (req, res) => {
  const db = readDb();
  const user = db.users.find((candidate) => candidate.id === req.user.id);
  const { name, profile } = req.body;

  if (name) user.name = name;
  user.profile = {
    ...user.profile,
    ...(profile || {})
  };
  writeDb(db);
  res.json({ user: publicUser(user) });
});

app.get("/api/courses", requireAuth, (req, res) => {
  const db = readDb();
  const userProgress = db.progress.filter((record) => record.userId === req.user.id);
  const courses = db.courses.map((course) => {
    const progressRecord = userProgress.find((record) => record.courseId === course.id);
    const calculated = calculateProgress(course, progressRecord);
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      duration: course.duration,
      difficulty: course.difficulty,
      level: course.level,
      category: course.category,
      accent: course.accent,
      icon: course.icon,
      chapterCount: course.chapters.length,
      lessonCount: course.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0),
      progressPercent: calculated.percent,
      enrolled: Boolean(progressRecord)
    };
  });
  res.json({ courses });
});

app.get("/api/courses/:courseId", requireAuth, (req, res) => {
  const db = readDb();
  const course = findCourse(db, req.params.courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }
  const progressRecord = getUserProgress(db, req.user.id, course.id);
  res.json({
    course: enrichCourse(course, progressRecord, db.quizzes),
    progress: { ...calculateProgress(course, progressRecord), enrolled: Boolean(progressRecord) }
  });
});

app.post("/api/courses/:courseId/enrol", requireAuth, (req, res) => {
  const db = readDb();
  const course = findCourse(db, req.params.courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }
  let progressRecord = getUserProgress(db, req.user.id, course.id);
  if (!progressRecord) {
    progressRecord = {
      userId: req.user.id,
      courseId: course.id,
      enrolledAt: new Date().toISOString(),
      currentLessonId: course.chapters[0]?.lessons[0]?.id || null,
      completedLessons: [],
      completedQuizzes: [],
      updatedAt: new Date().toISOString()
    };
    db.progress.push(progressRecord);
    writeDb(db);
  }
  res.status(201).json({
    course: enrichCourse(course, progressRecord, db.quizzes),
    progress: { ...calculateProgress(course, progressRecord), enrolled: true }
  });
});

app.put("/api/progress/lesson", requireAuth, (req, res) => {
  const { courseId, lessonId } = req.body;
  const db = readDb();
  const course = findCourse(db, courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }
  const lessonExists = course.chapters.some((chapter) => chapter.lessons.some((lesson) => lesson.id === lessonId));
  if (!lessonExists) {
    return res.status(404).json({ message: "Lesson not found." });
  }
  let progressRecord = getUserProgress(db, req.user.id, courseId);
  const gateProgress = progressRecord || {
    userId: req.user.id,
    courseId,
    completedLessons: [],
    completedQuizzes: []
  };
  const lessonAccess = getCourseGate(course, gateProgress).lessonAccess[lessonId];
  if (lessonAccess && !lessonAccess.unlocked) {
    return res.status(423).json({ message: lessonAccess.lockReason });
  }
  if (!progressRecord) {
    progressRecord = {
      userId: req.user.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      currentLessonId: lessonId,
      completedLessons: [],
      completedQuizzes: [],
      updatedAt: new Date().toISOString()
    };
    db.progress.push(progressRecord);
  }
  if (!progressRecord.completedLessons.includes(lessonId)) {
    progressRecord.completedLessons.push(lessonId);
  }
  progressRecord.currentLessonId = lessonId;
  progressRecord.updatedAt = new Date().toISOString();
  writeDb(db);
  res.json({
    course: enrichCourse(course, progressRecord, db.quizzes),
    progress: { ...calculateProgress(course, progressRecord), enrolled: true }
  });
});

app.get("/api/quizzes/:quizId", requireAuth, (req, res) => {
  const db = readDb();
  const { quiz, course } = findQuizContext(db, req.params.quizId);
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found." });
  }
  const progressRecord = getUserProgress(db, req.user.id, quiz.courseId);
  const quizAccess = getCourseGate(course, progressRecord).quizAccess[quiz.id];
  if (quizAccess && !quizAccess.unlocked) {
    return res.status(423).json({ message: quizAccess.lockReason });
  }
  res.json({
    quiz: {
      ...quiz
    }
  });
});

app.post("/api/quizzes/:quizId/attempt", requireAuth, (req, res) => {
  const { answers = [] } = req.body;
  const db = readDb();
  const { quiz, course } = findQuizContext(db, req.params.quizId);
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found." });
  }
  const existingProgress = getUserProgress(db, req.user.id, quiz.courseId);
  const quizAccess = getCourseGate(course, existingProgress).quizAccess[quiz.id];
  if (quizAccess && !quizAccess.unlocked) {
    return res.status(423).json({ message: quizAccess.lockReason });
  }

  const correctCount = quiz.questions.reduce((count, question, index) => {
    return answers[index] === question.answerIndex ? count + 1 : count;
  }, 0);
  const score = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = score >= quiz.passMark;
  const attempt = {
    id: uid("attempt"),
    userId: req.user.id,
    quizId: quiz.id,
    score,
    passed,
    answers,
    createdAt: new Date().toISOString()
  };

  db.quizAttempts.push(attempt);
  let progressRecord = getUserProgress(db, req.user.id, quiz.courseId);
  if (!progressRecord) {
    progressRecord = {
      userId: req.user.id,
      courseId: quiz.courseId,
      enrolledAt: new Date().toISOString(),
      currentLessonId: null,
      completedLessons: [],
      completedQuizzes: [],
      updatedAt: new Date().toISOString()
    };
    db.progress.push(progressRecord);
  }
  if (passed && !progressRecord.completedQuizzes.includes(quiz.id)) {
    progressRecord.completedQuizzes.push(quiz.id);
  }
  progressRecord.updatedAt = new Date().toISOString();
  writeDb(db);

  res.json({
    attempt,
    score,
    passed,
    passMark: quiz.passMark,
    feedback: quiz.questions.map((question, index) => ({
      questionId: question.id,
      correct: answers[index] === question.answerIndex,
      answerIndex: question.answerIndex,
      explanation: question.explanation
    })),
    progress: calculateProgress(course, progressRecord)
  });
});

app.get("/api/admin/summary", requireAuth, requireAdmin, (req, res) => {
  const db = readDb();
  const revenue = db.payments.filter((payment) => payment.status === "paid").reduce((sum, payment) => sum + payment.amount, 0);
  const learnerCount = db.users.filter((user) => user.role === "learner").length;
  const courseProgress = db.courses.map((course) => {
    const records = db.progress.filter((record) => record.courseId === course.id);
    const average =
      records.length === 0
        ? 0
        : Math.round(records.reduce((sum, record) => sum + calculateProgress(course, record).percent, 0) / records.length);
    return { name: course.title.replace("Data Analysis", "DA"), average };
  });

  res.json({
    metrics: {
      learners: learnerCount,
      courses: db.courses.length,
      revenue,
      certificationTracks: db.certificationTracks?.length || 0
    },
    users: db.users.map(publicUser),
    courses: db.courses,
    quizzes: db.quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      passMark: quiz.passMark,
      questions: quiz.questions.length,
      courseTitle: findCourse(db, quiz.courseId)?.title || "Course"
    })),
    payments: db.payments.map((payment) => ({
      ...payment,
      userEmail: db.users.find((user) => user.id === payment.userId)?.email || "Unknown",
      planName: db.pricingPlans.find((plan) => plan.id === payment.planId)?.name || "Plan"
    })),
    certificationTracks: db.certificationTracks || [],
    pricingPlans: db.pricingPlans,
    analytics: {
      courseProgress,
      revenueByPlan: db.pricingPlans.map((plan) => ({
        name: plan.name.replace(" Plan", ""),
        value: db.payments.filter((payment) => payment.planId === plan.id).reduce((sum, payment) => sum + payment.amount, 0)
      }))
    }
  });
});

app.post("/api/admin/courses", requireAuth, requireAdmin, (req, res) => {
  const db = readDb();
  const course = {
    id: uid("course"),
    title: req.body.title || "New Course",
    description: req.body.description || "Course description",
    duration: req.body.duration || "4 weeks",
    difficulty: req.body.difficulty || "Beginner",
    level: req.body.level || "Beginner",
    category: req.body.category || "Tech Training",
    accent: req.body.accent || "#176BFF",
    icon: req.body.icon || "BookOpen",
    chapters: []
  };
  db.courses.push(course);
  writeDb(db);
  res.status(201).json({ course });
});

app.put("/api/admin/courses/:courseId", requireAuth, requireAdmin, (req, res) => {
  const db = readDb();
  const course = findCourse(db, req.params.courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }
  Object.assign(course, {
    title: req.body.title ?? course.title,
    description: req.body.description ?? course.description,
    duration: req.body.duration ?? course.duration,
    difficulty: req.body.difficulty ?? course.difficulty,
    level: req.body.level ?? course.level,
    category: req.body.category ?? course.category
  });
  writeDb(db);
  res.json({ course });
});

app.delete("/api/admin/courses/:courseId", requireAuth, requireAdmin, (req, res) => {
  const db = readDb();
  const courseIndex = db.courses.findIndex((course) => course.id === req.params.courseId);
  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found." });
  }
  const [course] = db.courses.splice(courseIndex, 1);
  db.progress = db.progress.filter((record) => record.courseId !== course.id);
  writeDb(db);
  res.json({ course });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, "../../client/dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientDist));
}
  app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

app.listen(port, () => {
  console.log(`Smart Tech Training API running on http://localhost:${port}`);
});
