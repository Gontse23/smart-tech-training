import { Icon } from "../utils/icons.js";

export default function StatCard({ icon, label, value, hint }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">
        <Icon name={icon} size={20} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {hint ? <small>{hint}</small> : null}
      </div>
    </article>
  );
}
