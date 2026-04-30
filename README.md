# Smart Tech Training

Smart Tech Training is a full-stack mentor-led tech training platform. It includes learner authentication, a protected learner dashboard, course library, roadmap timeline, interactive quizzes, progress tracking, vendor and data science certification prep, pricing plans, profile updates, and an admin control room.

The app includes a custom Smart Tech Training logo in the main navigation and as a reusable SVG asset at `client/public/smart-tech-training-logo.svg`.

## Demo Accounts

Admin:

- Email: `admin@smarttechtraining.co.za`
- Password: `Admin123!`

Learner:

- Email: `learner@smarttechtraining.co.za`
- Password: `Learner123!`

## Tech Stack

- React + Vite frontend
- Tailwind CSS with a custom 2026 edtech design system
- Node.js + Express backend
- Custom JWT authentication
- File-backed JSON data store for local development
- Prisma PostgreSQL schema blueprint for later production database migration
- Recharts for analytics and progress charts
- PayFast/Yoco/Stripe payment placeholder data

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

   On this Windows PowerShell setup, script execution may block `npm.ps1`. Use:

   ```bash
   npm.cmd install
   ```

2. Copy the environment file:

   ```bash
   copy .env.example .env
   ```

3. Start the full app:

   ```bash
   npm run dev
   ```

   Or in PowerShell if `npm.ps1` is blocked:

   ```bash
   npm.cmd run dev
   ```

4. Open:

   - Frontend: `http://localhost:5199`
   - API health check: `http://localhost:4000/api/health`

The backend creates `server/data/db.json` automatically from the sample seed data on first run.

## Environment Variables

```bash
PORT=4000
CLIENT_URL=http://localhost:5199
JWT_SECRET=replace-with-a-long-random-secret
DATA_FILE=server/data/db.json
PAYMENT_PROVIDER=placeholder-payfast-yoco-stripe
```

For production, set a strong `JWT_SECRET`, configure a real payment provider, and migrate the JSON store to PostgreSQL using the Prisma schema blueprint.

## Folder Structure

```text
client/
  index.html
  src/
    components/       Reusable UI blocks
    context/          Auth and theme providers
    pages/            Landing, auth, learner, admin, quiz, pricing pages
    utils/            API and icon helpers
server/
  src/
    auth.js           JWT guards and role checks
    db.js             JSON data store helpers
    index.js          Express API
    learning.js       Progress and course enrichment helpers
    seedData.js       Sample users, courses, quizzes, pricing, payments
  prisma/
    schema.prisma     PostgreSQL model blueprint
  data/
    db.json           Generated local data store, ignored by git
```

## Included Features

- Learner registration and login
- Admin login with protected admin route
- Role-based route protection
- Learner dashboard with current course, progress percentage, completed chapters, upcoming topics, quiz scores, certification prep, and next step
- Visual Data Analyst Roadmap from Month 1 to Month 6
- Course library for Data Analysis, Web Development, Python, Networking, Security, and Microsoft Packages
- Microsoft Packages is split into Excel, Word, and PowerPoint chapters, each with its own 20-question quiz checkpoint
- Course search and level filtering
- Course details with chapters, lessons, quizzes, lesson completion, and enrolment
- Interactive multiple-choice quizzes with at least 20 questions, instant feedback, scoring, pass mark, retry, and progress update
- Cheat sheets and things-to-know notes for every course chapter
- Sequential lesson locking so learners complete sessions in order and pass quiz checkpoints before moving ahead
- Profile update screen
- Admin analytics dashboard
- Admin user, course, quiz, payment, certification prep, and pricing views
- Course create and delete actions
- Responsive mobile-first navigation
- Premium dark theme with dark blue, deep navy, dark green, neon green, and electric blue accents
- WhatsApp support included on every plan
- Sample pricing plans:
  - Starter Plan: `R350/month`
  - Professional Plan: `R650/month`
  - Full Bootcamp: `R3,500 once-off`

## Database Models

The demo uses JSON for zero-setup local development. The production-ready model blueprint in `server/prisma/schema.prisma` covers:

- Users
- Admins through user roles
- Courses
- Chapters
- Lessons
- Quizzes
- Quiz questions
- Quiz attempts
- Progress
- Certification tracks
- Pricing plans
- Payments/subscriptions

## API Overview

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me`
- `GET /api/bootstrap`
- `GET /api/dashboard`
- `GET /api/courses`
- `GET /api/courses/:courseId`
- `POST /api/courses/:courseId/enrol`
- `PUT /api/progress/lesson`
- `GET /api/quizzes/:quizId`
- `POST /api/quizzes/:quizId/attempt`
- `PUT /api/profile`
- `GET /api/admin/summary`
- `POST /api/admin/courses`
- `PUT /api/admin/courses/:courseId`
- `DELETE /api/admin/courses/:courseId`

## Deployment

1. Build the frontend:

   ```bash
   npm run build
   ```

2. Run the Express server in production mode:

   ```bash
   NODE_ENV=production npm start
   ```

   On Windows PowerShell:

   ```powershell
   $env:NODE_ENV="production"; npm.cmd start
   ```

3. Host on a Node-capable platform such as Render, Railway, Fly.io, Azure App Service, or a VPS.

4. Production upgrades recommended before real payments:

   - Replace JSON storage with PostgreSQL.
   - Add Prisma migrations and backups.
   - Wire PayFast, Yoco, or Stripe checkout/subscription webhooks.
   - Add email verification and password reset.
   - Add real vendor exam links and booking guidance for Microsoft, Power BI, Azure, and data science tracks.
   - Add admin audit logs and richer assignment upload handling.
