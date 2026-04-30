import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api.js";
import ErrorState from "../components/ErrorState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import RoadmapTimeline from "../components/RoadmapTimeline.jsx";

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    apiFetch("/api/dashboard")
      .then((data) => {
        setRoadmap(data.roadmap || []);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) return <LoadingState label="Loading roadmap" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <section className="page-stack">
      <div className="page-title">
        <span>Visual roadmap</span>
        <h2>Data Analyst Roadmap</h2>
        <p>Six months of focused milestones from computer basics to portfolio and career readiness.</p>
      </div>
      <RoadmapTimeline months={roadmap} currentIndex={2} />
      <div className="roadmap-summary-grid">
        {[
          ["Foundation", "Computer basics, Excel basics, and data analysis vocabulary."],
          ["Technical core", "Advanced Excel, SQL, Python, Power BI, statistics, cleaning, and visualization."],
          ["Job-ready finish", "Portfolio projects, vendor exam prep, CV, LinkedIn, GitHub, and interview preparation."]
        ].map(([title, body]) => (
          <article className="panel" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
