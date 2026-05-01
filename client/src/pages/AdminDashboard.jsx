import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { apiFetch } from "../utils/api.js";
import ErrorState from "../components/ErrorState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import StatCard from "../components/StatCard.jsx";
import { Icon } from "../utils/icons.js";

const tabs = ["Analytics", "Users", "Courses", "Quizzes", "Payments", "Certification Prep", "Pricing"];
const pieColors = ["#39FF88", "#00A8FF", "#D7FF3F", "#105D43"];
const emptyUserForm = { name: "", email: "", password: "", role: "learner", planId: "starter", courseId: "" };

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("Analytics");
  const [userForm, setUserForm] = useState(emptyUserForm);
  const [courseForm, setCourseForm] = useState({ title: "", description: "", duration: "4 weeks", level: "Beginner", difficulty: "Beginner", category: "Tech Training" });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    apiFetch("/api/admin/summary")
      .then((payload) => {
        setData(payload);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const createUser = async (event) => {
    event.preventDefault();
    setActionLoading(true);
    setError("");
    try {
      await apiFetch("/api/admin/users", { method: "POST", body: userForm });
      setUserForm(emptyUserForm);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const createCourse = async (event) => {
    event.preventDefault();
    setActionLoading(true);
    setError("");
    try {
      await apiFetch("/api/admin/courses", { method: "POST", body: courseForm });
      setCourseForm({ title: "", description: "", duration: "4 weeks", level: "Beginner", difficulty: "Beginner", category: "Tech Training" });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    setActionLoading(true);
    setError("");
    try {
      await apiFetch(`/api/admin/courses/${courseId}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingState label="Loading admin dashboard" />;
  if (error && !data) return <ErrorState message={error} onRetry={load} />;

  return (
    <section className="page-stack admin-page">
      {error ? <ErrorState title="Admin action failed" message={error} onRetry={load} /> : null}
      <div className="stats-grid">
        <StatCard icon="Users" label="Registered learners" value={data.metrics.learners} hint="Active user accounts" />
        <StatCard icon="BookOpen" label="Courses" value={data.metrics.courses} hint="Published and draft" />
        <StatCard icon="BarChart3" label="Revenue" value={`R${data.metrics.revenue.toLocaleString("en-ZA")}`} hint="Placeholder payments" />
        <StatCard icon="GraduationCap" label="Certification prep" value={data.metrics.certificationTracks} hint="Vendor and data science tracks" />
      </div>

      <div className="admin-tabs">
        {tabs.map((item) => (
          <button className={tab === item ? "active" : ""} type="button" key={item} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>

      {tab === "Analytics" ? (
        <div className="dashboard-grid">
          <article className="panel">
            <div className="panel-heading">
              <div>
                <span>Progress</span>
                <h3>Average course completion</h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.analytics.courseProgress} barSize={26}>
                <CartesianGrid vertical={false} stroke="rgba(148, 163, 184, .22)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="average" fill="#39FF88" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </article>
          <article className="panel">
            <div className="panel-heading">
              <div>
                <span>Revenue</span>
                <h3>Payments by plan</h3>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={data.analytics.revenueByPlan} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96}>
                  {data.analytics.revenueByPlan.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </article>
        </div>
      ) : null}

      {tab === "Users" ? (
        <div className="admin-two-col">
          <form className="panel admin-form" onSubmit={createUser}>
            <div className="panel-heading">
              <div>
                <span>User management</span>
                <h3>Add account</h3>
              </div>
            </div>
            <label>
              Full name
              <input
                value={userForm.name}
                onChange={(event) => setUserForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={userForm.email}
                onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                minLength={8}
                value={userForm.password}
                onChange={(event) => setUserForm((current) => ({ ...current, password: event.target.value }))}
                required
              />
            </label>
            <label>
              Role
              <select
                value={userForm.role}
                onChange={(event) =>
                  setUserForm((current) => ({
                    ...current,
                    role: event.target.value,
                    courseId: event.target.value === "admin" ? "" : current.courseId
                  }))
                }
                required
              >
                <option value="learner">Learner</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label>
              Package
              <select
                value={userForm.planId}
                onChange={(event) => setUserForm((current) => ({ ...current, planId: event.target.value }))}
                required
              >
                {data.pricingPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - R{plan.price.toLocaleString("en-ZA")} / {plan.cadence}
                  </option>
                ))}
              </select>
            </label>
            {userForm.role === "learner" ? (
              <label>
                Course
                <select
                  value={userForm.courseId}
                  onChange={(event) => setUserForm((current) => ({ ...current, courseId: event.target.value }))}
                  required
                >
                  <option value="">Select learner course</option>
                  {data.courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} - {course.duration}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            <button className="button button-primary" type="submit" disabled={actionLoading}>
              <Icon name="Plus" size={16} />
              Add account
            </button>
          </form>
          <article className="panel">
            <Table
              columns={["Name", "Email", "Role", "Package", "Course", "Joined"]}
              rows={data.users.map((user) => [
                user.name,
                user.email,
                user.role,
                user.planName,
                user.enrolledCourses?.join(", ") || "Not enrolled",
                new Date(user.joinedAt).toLocaleDateString("en-ZA")
              ])}
            />
          </article>
        </div>
      ) : null}

      {tab === "Courses" ? (
        <div className="admin-two-col">
          <form className="panel admin-form" onSubmit={createCourse}>
            <div className="panel-heading">
              <div>
                <span>Course management</span>
                <h3>Add course</h3>
              </div>
            </div>
            {["title", "description", "duration", "level", "difficulty", "category"].map((field) => (
              <label key={field}>
                {field}
                <input
                  value={courseForm[field]}
                  onChange={(event) => setCourseForm((current) => ({ ...current, [field]: event.target.value }))}
                  required={field === "title"}
                />
              </label>
            ))}
            <button className="button button-primary" type="submit" disabled={actionLoading}>
              <Icon name="Plus" size={16} />
              Add course
            </button>
          </form>
          <article className="panel">
            <div className="course-admin-list">
              {data.courses.map((course) => (
                <div key={course.id}>
                  <div>
                    <strong>{course.title}</strong>
                    <span>{course.chapters.length} chapters | {course.difficulty}</span>
                  </div>
                  <button className="button button-ghost danger" type="button" onClick={() => deleteCourse(course.id)} disabled={actionLoading}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </article>
        </div>
      ) : null}

      {tab === "Quizzes" ? (
        <article className="panel">
          <Table
            columns={["Quiz", "Course", "Questions", "Pass mark"]}
            rows={data.quizzes.map((quiz) => [quiz.title, quiz.courseTitle, quiz.questions, `${quiz.passMark}%`])}
          />
        </article>
      ) : null}

      {tab === "Payments" ? (
        <article className="panel">
          <Table
            columns={["Learner", "Plan", "Amount", "Status", "Provider"]}
            rows={data.payments.map((payment) => [
              payment.userEmail,
              payment.planName,
              `R${payment.amount.toLocaleString("en-ZA")}`,
              payment.status,
              payment.provider
            ])}
          />
        </article>
      ) : null}

      {tab === "Certification Prep" ? (
        <article className="panel">
          <div className="course-admin-list">
            {data.certificationTracks.map((track) => (
              <div key={track.id}>
                <div>
                  <strong>{track.title}</strong>
                  <span>{track.vendor} | {track.exam} | {track.progress}% prep complete</span>
                </div>
                <span className="admin-status-pill">{track.status.replace("-", " ")}</span>
              </div>
            ))}
          </div>
        </article>
      ) : null}

      {tab === "Pricing" ? (
        <article className="panel">
          <Table
            columns={["Plan", "Price", "Cadence", "Includes"]}
            rows={data.pricingPlans.map((plan) => [
              plan.name,
              `R${plan.price.toLocaleString("en-ZA")}`,
              plan.cadence,
              plan.includes.join(", ")
            ])}
          />
        </article>
      ) : null}
    </section>
  );
}

function Table({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
