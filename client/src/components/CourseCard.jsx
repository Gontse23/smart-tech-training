import { Link } from "react-router-dom";
import { Icon } from "../utils/icons.js";

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <div className="course-icon" style={{ "--accent": course.accent }}>
        <Icon name={course.icon} size={22} />
      </div>
      <div className="course-card-body">
        <div className="course-meta">
          <span>{course.category}</span>
          <span>{course.level}</span>
        </div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-facts">
          <span>{course.duration}</span>
          <span>{course.chapterCount} chapters</span>
          <span>{course.lessonCount || 0} lessons</span>
        </div>
        <div className="progress-track" aria-label={`${course.progressPercent || 0}% complete`}>
          <span style={{ width: `${course.progressPercent || 0}%` }} />
        </div>
        <div className="course-actions">
          <span>{course.enrolled ? `${course.progressPercent || 0}% complete` : "Not enrolled"}</span>
          <Link className="button button-ghost" to={`/app/courses/${course.id}`}>
            Open
            <Icon name="ChevronRight" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
