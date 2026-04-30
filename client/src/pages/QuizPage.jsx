import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../utils/api.js";
import ErrorState from "../components/ErrorState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import { Icon } from "../utils/icons.js";

export default function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    apiFetch(`/api/quizzes/${quizId}`)
      .then((payload) => {
        setQuiz(payload.quiz);
        setAnswers(Array(payload.quiz.questions.length).fill(null));
        setResult(null);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [quizId]);

  const answeredCount = useMemo(() => answers.filter((answer) => answer !== null).length, [answers]);

  const submit = async () => {
    setSubmitting(true);
    try {
      const payload = await apiFetch(`/api/quizzes/${quizId}/attempt`, {
        method: "POST",
        body: { answers }
      });
      setResult(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState label="Loading quiz" />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <section className="page-stack quiz-page">
      <div className="quiz-header panel">
        <div>
          <span>Interactive quiz</span>
          <h2>{quiz.title}</h2>
          <p>Pass mark: {quiz.passMark}%. Feedback appears as soon as you choose an answer.</p>
        </div>
        <div className="completion-badge">
          {answeredCount}/{quiz.questions.length}
        </div>
      </div>

      <div className="quiz-list">
        {quiz.questions.map((question, questionIndex) => {
          const selected = answers[questionIndex];
          return (
            <article className="quiz-card" key={question.id}>
              <div className="question-head">
                <span>Question {questionIndex + 1}</span>
                <h3>{question.prompt}</h3>
              </div>
              <div className="answer-grid">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selected === optionIndex;
                  const isCorrect = selected !== null && question.answerIndex === optionIndex;
                  const isWrong = isSelected && question.answerIndex !== optionIndex;
                  return (
                    <button
                      className={`answer-option ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                      key={option}
                      type="button"
                      onClick={() =>
                        setAnswers((current) => current.map((answer, index) => (index === questionIndex ? optionIndex : answer)))
                      }
                    >
                      <span>{option}</span>
                      {isSelected ? <Icon name={isWrong ? "X" : "Check"} size={17} /> : null}
                    </button>
                  );
                })}
              </div>
              {selected !== null ? (
                <div className={question.answerIndex === selected ? "feedback correct" : "feedback wrong"}>
                  {question.answerIndex === selected ? "Correct. " : "Review. "}
                  {question.explanation}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="quiz-footer panel">
        {result ? (
          <div className="quiz-result">
            <div className={`result-mark ${result.passed ? "passed" : "failed"}`}>
              <strong>{result.score}%</strong>
              <span>{result.passed ? "Passed" : "Retry needed"}</span>
            </div>
            <p>
              {result.passed
                ? `Great work. Your progress is now ${result.progress.percent}% on this course.`
                : `You need ${result.passMark}% to pass. Review the instant feedback and try again.`}
            </p>
          </div>
        ) : (
          <p>Answer every question, then submit to save your score and update progress.</p>
        )}
        <div className="quiz-actions">
          <button
            className="button button-primary"
            type="button"
            onClick={submit}
            disabled={submitting || answeredCount !== quiz.questions.length}
          >
            {submitting ? "Scoring..." : result ? "Submit again" : "Submit quiz"}
          </button>
          <button
            className="button button-ghost"
            type="button"
            onClick={() => {
              setAnswers(Array(quiz.questions.length).fill(null));
              setResult(null);
            }}
          >
            Retry
          </button>
          <Link className="button button-ghost" to={`/app/courses/${quiz.courseId}`}>
            Back to course
          </Link>
        </div>
      </div>
    </section>
  );
}
