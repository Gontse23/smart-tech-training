import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import {
  certificationTracks,
  courses,
  payments,
  pricingPlans,
  progress,
  quizAttempts,
  quizzes,
  resources,
  roadmapMonths,
  seedUsers
} from "./seedData.js";

const defaultDataFile = path.resolve("server/data/db.json");
const dataFile = path.resolve(process.env.DATA_FILE || defaultDataFile);

function sanitizeUserSeed(user) {
  const { initialPassword, ...safeUser } = user;
  return {
    ...safeUser,
    passwordHash: bcrypt.hashSync(initialPassword, 10),
    lastActiveAt: new Date().toISOString()
  };
}

export function initializeDatabase() {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });

  if (!fs.existsSync(dataFile)) {
    const db = {
      users: seedUsers.map(sanitizeUserSeed),
      courses,
      quizzes,
      progress,
      quizAttempts,
      certificationTracks,
      pricingPlans,
      payments,
      resources,
      roadmapMonths,
      notifications: [
        {
          id: "notice-001",
          userId: "user-learner",
          title: "Next live Q&A",
          body: "Bring one SQL question and one portfolio question to the Saturday mentorship room.",
          createdAt: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(dataFile, JSON.stringify(db, null, 2));
  }

  const db = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  let changed = false;

  if (JSON.stringify(db.pricingPlans) !== JSON.stringify(pricingPlans)) {
    db.pricingPlans = pricingPlans;
    changed = true;
  }

  if (JSON.stringify(db.certificationTracks) !== JSON.stringify(certificationTracks)) {
    db.certificationTracks = certificationTracks;
    changed = true;
  }

  if (JSON.stringify(db.quizzes) !== JSON.stringify(quizzes)) {
    db.quizzes = quizzes;
    changed = true;
  }

  if (Array.isArray(db.certificates)) {
    delete db.certificates;
    changed = true;
  }

  const seededCourseIds = new Set(courses.map((course) => course.id));
  const currentCourses = Array.isArray(db.courses) ? db.courses : [];
  const currentSeededCourses = currentCourses.filter((course) => seededCourseIds.has(course.id));
  const customCourses = currentCourses.filter((course) => !seededCourseIds.has(course.id));
  if (JSON.stringify(currentSeededCourses) !== JSON.stringify(courses) || currentSeededCourses.length !== courses.length) {
    db.courses = [...courses, ...customCourses];
    changed = true;
  }

  db.users = (db.users || []).map((user) => {
    if (user.planId === "basic") {
      changed = true;
      return { ...user, planId: "starter" };
    }
    if (user.planId === "pro" || user.planId === "premium") {
      changed = true;
      return { ...user, planId: user.role === "admin" ? "bootcamp" : "professional" };
    }
    return user;
  });

  db.payments = (db.payments || payments).map((payment) => {
    if (payment.planId === "pro" || payment.planId === "premium" || payment.amount < 650) {
      changed = true;
      return { ...payment, planId: "professional", amount: 650 };
    }
    return payment;
  });

  if (changed) {
    fs.writeFileSync(dataFile, JSON.stringify(db, null, 2));
  }
}

export function readDb() {
  initializeDatabase();
  return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
}

export function writeDb(db) {
  fs.writeFileSync(dataFile, JSON.stringify(db, null, 2));
}

export function publicUser(user) {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
