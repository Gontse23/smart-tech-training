export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <strong>{title}</strong>
      <p>{message}</p>
      {onRetry ? (
        <button className="button button-ghost" type="button" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}
