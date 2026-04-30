import jwt from "jsonwebtoken";
import { readDb, publicUser } from "./db.js";

const jwtSecret = process.env.JWT_SECRET || "dev-only-datapath-secret";

export function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: "7d" });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    const db = readDb();
    const user = db.users.find((candidate) => candidate.id === payload.sub);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    req.user = user;
    req.publicUser = publicUser(user);
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired session." });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  next();
}
