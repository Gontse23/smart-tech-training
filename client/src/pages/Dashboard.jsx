import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { apiFetch } from "../utils/api.js";
import CertificationPrepCard from "../components/CertificationPrepCard.jsx";
import ErrorState from "../components/ErrorState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import RoadmapTimeline from "../components/RoadmapTimeline.jsx";
import StatCard from "../components/StatCard.jsx";
import { Icon } from "../utils/icons.js";

const trend = [
  { week: "W1", progress: 12 },
  { week: "W2", progress: 24 },
  { week: "W3", progress: 35 },
  { week: "W4", progress: 44 },
  { week: "W5", progress: 52 },
  { week: "W6", progress: 61 }
];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    apiFetch("/api/dashboard")
      .then((payload) => {
        setData(payload);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) return <LoadingState label="Loading dashboard" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  const course = data.currentCourse;
  const certificationTracks = data.certificationTracks || [];

  return (
    <section className="page-stack">
      <div className="dashboard-hero">
        <div>
          <span>Continue where you left off</span>
          <h2>{course.title}</h2>
          <p>{data.recommendedNextStep}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to={`/app/courses/${course.id}`}>
              Continue learning
            </Link>
            <Link className="button button-ghost" to="/app/roadmap">
              View roadmap
            </Link>
          </div>
        </div>
        <div className="progress-dial" style={{ "--progress": `${course.progressPercent}%` }}>
          <strong>{course.progressPercent}%</strong>
          <span>complete</span>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon="BookOpen" label="Current course" value={course.title} hint={course.duration} />
        <StatCard icon="ClipboardCheck" label="Completed chapters" value={course.completedChapters.length} hint="Roadmap checkpoints" />
        <StatCard icon="GraduationCap" label="Certification prep" value={certificationTracks.length} hint="Vendor and data science tracks" />
        <StatCard icon="Target" label="Estimated completion" value={course.estimatedCompletion} hint="At current pace" />
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span>Progress analytics</span>
              <h3>Learning momentum</h3>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#176BFF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#176BFF" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(148, 163, 184, .22)" />
              <XAxis dataKey="week" axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="progress" stroke="#176BFF" fill="url(#progressGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span>Upcoming topics</span>
              <h3>{course.nextChapter || "Next step"}</h3>
            </div>
          </div>
          <div className="task-list">
            {data.upcomingTopics.map((topic) => (
              <div key={topic}>
                <Icon name="PlayCircle" size={18} />
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span>Quiz scores</span>
              <h3>Latest attempts</h3>
            </div>
          </div>
          <div className="score-list">
            {data.quizScores.map((attempt) => (
              <div key={attempt.id}>
                <div>
                  <strong>{attempt.quizTitle}</strong>
                  <span>{new Date(attempt.createdAt).toLocaleDateString("en-ZA")}</span>
                </div>
                <b className={attempt.passed ? "pass" : "retry"}>{attempt.score}%</b>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span>Certification prep</span>
              <h3>Vendor and data science readiness</h3>
            </div>
          </div>
          <div className="cert-prep-list">
            {certificationTracks.length ? (
              certificationTracks.slice(0, 3).map((track) => <CertificationPrepCard key={track.id} track={track} />)
            ) : (
              <div className="empty-state">Certification prep tracks will appear here when admin publishes them.</div>
            )}
          </div>
        </article>
      </div>

      <article className="panel">
        <div className="panel-heading">
          <div>
            <span>Roadmap snapshot</span>
            <h3>Data Analyst Roadmap</h3>
          </div>
        </div>
        <RoadmapTimeline months={data.roadmap} currentIndex={2} />
      </article>
    </section>
  );
}
