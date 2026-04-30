import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../utils/api.js";
import ErrorState from "../components/ErrorState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import { Icon } from "../utils/icons.js";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [gateMessage, setGateMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    apiFetch(`/api/courses/${courseId}`)
      .then((payload) => {
        setCourse(payload.course);
        setProgress(payload.progress);
        const nextLesson =
          payload.progress?.nextLesson?.type === "quiz"
            ? null
            : payload.course.chapters
                .flatMap((chapter) => chapter.lessons)
                .find((lesson) => lesson.id === payload.progress?.nextLesson?.id) || payload.course.chapters[0]?.lessons[0];
        setSelectedLesson(nextLesson);
        setGateMessage("");
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [courseId]);

  const completedLessons = new Set(progress?.completedLessons || []);
  const selectedChapter = useMemo(
    () => course?.chapters.find((chapter) => chapter.lessons.some((lesson) => lesson.id === selectedLesson?.id)) || null,
    [course, selectedLesson]
  );
  const selectedLessonState = selectedChapter?.lessons.find((lesson) => lesson.id === selectedLesson?.id) || selectedLesson;
  const selectedNotes = selectedChapter?.studyNotes || [];

  const enroll = async () => {
    setActionLoading(true);
    try {
      const payload = await apiFetch(`/api/courses/${courseId}/enrol`, { method: "POST" });
      setCourse(payload.course);
      setProgress(payload.progress);
      setSelectedLesson(payload.course.chapters[0]?.lessons[0] || null);
      setGateMessage("");
    } finally {
      setActionLoading(false);
    }
  };

  const completeLesson = async () => {
    if (!selectedLesson) return;
    setActionLoading(true);
    try {
      const payload = await apiFetch("/api/progress/lesson", {
        method: "PUT",
        body: { courseId, lessonId: selectedLesson.id }
      });
      setCourse(payload.course);
      setProgress(payload.progress);
      setGateMessage("");
    } catch (err) {
      setGateMessage(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingState label="Loading course" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  const enrolled = Boolean(progress?.enrolled);
  const selectedLessonLocked = !enrolled || Boolean(selectedLessonState?.locked);

  return (
    <section className="page-stack">
      <div className="course-detail-hero">
        <div className="course-icon large" style={{ "--accent": course.accent }}>
          <Icon name={course.icon} size={28} />
        </div>
        <div>
          <span>{course.category}</span>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <div className="course-facts">
            <span>{course.duration}</span>
            <span>{course.difficulty}</span>
            <span>{course.chapters.length} chapters</span>
          </div>
        </div>
        <div className="progress-dial compact" style={{ "--progress": `${progress?.percent || 0}%` }}>
          <strong>{progress?.percent || 0}%</strong>
          <span>complete</span>
        </div>
      </div>

      {!enrolled ? (
        <div className="panel action-panel">
          <div>
            <h3>Enrol in this learning path</h3>
            <p>Enrolment adds the course to your dashboard and starts progress tracking.</p>
          </div>
          <button className="button button-primary" type="button" onClick={enroll} disabled={actionLoading}>
            {actionLoading ? "Enrolling..." : "Enrol now"}
          </button>
        </div>
      ) : null}

      <div className="learning-layout">
        <aside className="lesson-nav panel">
          <div className="panel-heading">
            <div>
              <span>Chapters</span>
              <h3>Course outline</h3>
            </div>
          </div>
          {course.chapters.map((chapter) => (
            <div className="chapter-block" key={chapter.id}>
              <div className="chapter-title-row">
                <strong>{chapter.title}</strong>
                <span>{chapter.status.percent}%</span>
              </div>
              {chapter.lessons.map((lesson) => {
                const locked = !enrolled || lesson.locked;
                const lockReason = !enrolled ? "Enrol in this course before starting sessions." : lesson.lockReason;
                return (
                  <button
                    key={lesson.id}
                    className={`${selectedLesson?.id === lesson.id ? "lesson-link active" : "lesson-link"} ${locked ? "locked" : ""}`}
                    type="button"
                    onClick={() => {
                      if (locked) {
                        setGateMessage(lockReason);
                        return;
                      }
                      setSelectedLesson(lesson);
                      setGateMessage("");
                    }}
                    title={locked ? lockReason : ""}
                  >
                    <Icon
                      name={locked ? "LockKeyhole" : completedLessons.has(lesson.id) ? "Check" : lesson.type === "project" ? "ClipboardCheck" : "PlayCircle"}
                      size={16}
                    />
                    <span>{lesson.title}</span>
                  </button>
                );
              })}
              {chapter.quiz ? (
                chapter.quiz.locked || !enrolled ? (
                  <button
                    className="lesson-link quiz-link locked"
                    type="button"
                    onClick={() => setGateMessage(!enrolled ? "Enrol in this course before taking quizzes." : chapter.quiz.lockReason)}
                    title={!enrolled ? "Enrol in this course before taking quizzes." : chapter.quiz.lockReason}
                  >
                    <Icon name="LockKeyhole" size={16} />
                    <span>{chapter.quiz.title}</span>
                  </button>
                ) : (
                  <Link className="lesson-link quiz-link" to={`/app/quizzes/${chapter.quiz.id}`}>
                    <Icon name="ClipboardCheck" size={16} />
                    <span>{chapter.quiz.title}</span>
                  </Link>
                )
              ) : null}
            </div>
          ))}
        </aside>

        <article className="lesson-reader panel">
          {gateMessage ? (
            <div className="lesson-callout lock-callout">
              <Icon name="LockKeyhole" size={18} />
              <span>{gateMessage}</span>
            </div>
          ) : null}
          {selectedLesson ? (
            <>
              <div className="lesson-reader-head">
                <div>
                  <span>{selectedLessonState.type}</span>
                  <h3>{selectedLessonState.title}</h3>
                  <small>{selectedLessonState.duration}</small>
                </div>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={completeLesson}
                  disabled={actionLoading || selectedLessonLocked || completedLessons.has(selectedLessonState.id)}
                >
                  {completedLessons.has(selectedLessonState.id) ? "Completed" : actionLoading ? "Saving..." : "Mark complete"}
                </button>
              </div>
              <p>{selectedLessonState.content}</p>
              {selectedNotes.length ? (
                <div className="study-notes">
                  <div>
                    <Icon name="FileText" size={18} />
                    <h4>Cheat sheet and things to know</h4>
                  </div>
                  <ul>
                    {selectedNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="lesson-callout">
                <Icon name="FileText" size={18} />
                <span>Finish sessions in order. The next chapter stays locked until you pass the quiz checkpoint.</span>
              </div>
            </>
          ) : (
            <div className="empty-state">Complete the current sessions, then pass the quiz checkpoint to unlock the next section.</div>
          )}
        </article>
      </div>
    </section>
  );
}
