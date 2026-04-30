export default function LoadingState({ label = "Loading", full = false }) {
  return (
    <div className={full ? "state-screen" : "state-inline"}>
      <span className="loader" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
