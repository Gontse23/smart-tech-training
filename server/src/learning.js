export function courseUnits(course) {
  const lessonIds = course.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => lesson.id));
  const quizIds = course.chapters.map((chapter) => chapter.quizId).filter(Boolean);
  return { lessonIds, quizIds, total: lessonIds.length + quizIds.length };
}

export function getCourseGate(course, progressRecord) {
  const completedLessons = new Set(progressRecord?.completedLessons || []);
  const completedQuizzes = new Set(progressRecord?.completedQuizzes || []);
  const lessonAccess = {};
  const quizAccess = {};
  let lockedAfterCurrentGap = false;

  for (const chapter of course?.chapters || []) {
    for (const lesson of chapter.lessons) {
      const unlocked = !lockedAfterCurrentGap;
      lessonAccess[lesson.id] = {
        unlocked,
        lockReason: unlocked ? "" : "Complete the previous session and pass its quiz checkpoint first."
      };
      if (!completedLessons.has(lesson.id)) {
        lockedAfterCurrentGap = true;
      }
    }

    if (chapter.quizId) {
      const chapterLessonsDone = chapter.lessons.every((lesson) => completedLessons.has(lesson.id));
      const unlocked = !lockedAfterCurrentGap && chapterLessonsDone;
      quizAccess[chapter.quizId] = {
        unlocked,
        lockReason: chapterLessonsDone
          ? "Pass the previous quiz checkpoint before moving ahead."
          : "Complete every session in this chapter before taking the quiz."
      };
      if (!completedQuizzes.has(chapter.quizId)) {
        lockedAfterCurrentGap = true;
      }
    }
  }

  return { lessonAccess, quizAccess };
}

function buildStudyNotes(course, chapter) {
  if (Array.isArray(chapter.studyNotes) && chapter.studyNotes.length > 0) {
    return chapter.studyNotes;
  }

  const topicNotes = (chapter.topics || []).map((topic) => `Know ${topic}: explain it clearly and apply it in a practical ${course.category} task.`);
  const lessonNotes = (chapter.lessons || []).map((lesson) => `Practice ${lesson.title}: ${lesson.content}`);
  return [...topicNotes, ...lessonNotes].slice(0, 8);
}

export function calculateProgress(course, progressRecord) {
  if (!course || !progressRecord) {
    return {
      percent: 0,
      completedChapters: [],
      completedLessons: [],
      completedQuizzes: [],
      nextLesson: null,
      nextChapter: null
    };
  }

  const completedLessons = new Set(progressRecord.completedLessons || []);
  const completedQuizzes = new Set(progressRecord.completedQuizzes || []);
  const units = courseUnits(course);
  const completedUnitCount =
    units.lessonIds.filter((id) => completedLessons.has(id)).length +
    units.quizIds.filter((id) => completedQuizzes.has(id)).length;

  const completedChapters = course.chapters.filter((chapter) => {
    const chapterLessonsDone = chapter.lessons.every((lesson) => completedLessons.has(lesson.id));
    const quizDone = !chapter.quizId || completedQuizzes.has(chapter.quizId);
    return chapterLessonsDone && quizDone;
  });

  let nextLesson = null;
  let nextChapter = null;
  for (const chapter of course.chapters) {
    const missingLesson = chapter.lessons.find((lesson) => !completedLessons.has(lesson.id));
    if (missingLesson) {
      nextLesson = missingLesson;
      nextChapter = chapter;
      break;
    }
    if (chapter.quizId && !completedQuizzes.has(chapter.quizId)) {
      nextLesson = { id: chapter.quizId, title: `${chapter.title} quiz`, type: "quiz", duration: "10 min" };
      nextChapter = chapter;
      break;
    }
  }

  return {
    percent: units.total === 0 ? 0 : Math.round((completedUnitCount / units.total) * 100),
    completedChapters,
    completedLessons: [...completedLessons],
    completedQuizzes: [...completedQuizzes],
    nextLesson,
    nextChapter
  };
}

export function chapterStatus(chapter, progressRecord) {
  const completedLessons = new Set(progressRecord?.completedLessons || []);
  const completedQuizzes = new Set(progressRecord?.completedQuizzes || []);
  const lessonCount = chapter.lessons.length;
  const doneLessons = chapter.lessons.filter((lesson) => completedLessons.has(lesson.id)).length;
  const quizDone = !chapter.quizId || completedQuizzes.has(chapter.quizId);
  const done = doneLessons === lessonCount && quizDone;

  return {
    done,
    lessonCount,
    doneLessons,
    quizDone,
    percent: Math.round(((doneLessons + (quizDone && chapter.quizId ? 1 : 0)) / (lessonCount + (chapter.quizId ? 1 : 0))) * 100)
  };
}

export function enrichCourse(course, progressRecord, quizzes = []) {
  const progress = calculateProgress(course, progressRecord);
  const gate = getCourseGate(course, progressRecord);
  return {
    ...course,
    progressPercent: progress.percent,
    completedChapters: progress.completedChapters.map((chapter) => chapter.id),
    chapters: course.chapters.map((chapter) => ({
      ...chapter,
      studyNotes: buildStudyNotes(course, chapter),
      status: chapterStatus(chapter, progressRecord),
      lessons: chapter.lessons.map((lesson) => {
        const access = gate.lessonAccess[lesson.id] || { unlocked: true, lockReason: "" };
        return {
          ...lesson,
          locked: !access.unlocked,
          lockReason: access.lockReason
        };
      }),
      quiz: (() => {
        const quiz = quizzes.find((candidate) => candidate.id === chapter.quizId);
        if (!quiz) return null;
        const access = gate.quizAccess[quiz.id] || { unlocked: true, lockReason: "" };
        return {
          ...quiz,
          locked: !access.unlocked,
          lockReason: access.lockReason
        };
      })()
    }))
  };
}
