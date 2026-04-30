import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../utils/api.js";
import CourseCard from "../components/CourseCard.jsx";
import ErrorState from "../components/ErrorState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import { Icon } from "../utils/icons.js";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    apiFetch("/api/courses")
      .then((payload) => {
        setCourses(payload.courses || []);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filteredCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery =
        !search ||
        [course.title, course.description, course.category, course.level].some((field) => field?.toLowerCase().includes(search));
      const matchesLevel = level === "All" || course.level === level;
      return matchesQuery && matchesLevel;
    });
  }, [courses, level, query]);

  if (loading) return <LoadingState label="Loading courses" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <section className="page-stack">
      <div className="page-title with-actions">
        <div>
          <span>Course library</span>
          <h2>Choose a tech training track</h2>
          <p>Search by tool, skill, course area, or level.</p>
        </div>
      </div>

      <div className="filter-bar">
        <label className="search-box">
          <Icon name="Search" size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search web, Python, networking..." />
        </label>
        <div className="segmented-control" aria-label="Filter by level">
          {levels.map((item) => (
            <button className={level === item ? "active" : ""} type="button" key={item} onClick={() => setLevel(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
