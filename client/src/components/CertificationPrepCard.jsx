import { Icon } from "../utils/icons.js";

export default function CertificationPrepCard({ track }) {
  return (
    <article className="cert-prep-card">
      <div className="cert-prep-icon">
        <Icon name="GraduationCap" size={22} />
      </div>
      <div>
        <div className="cert-prep-head">
          <h3>{track.title}</h3>
          <span>{track.exam}</span>
        </div>
        <p>{track.description}</p>
        <div className="progress-track" aria-label={`${track.progress}% preparation complete`}>
          <span style={{ width: `${track.progress}%` }} />
        </div>
        <small>{track.vendor} prep | {track.status.replace("-", " ")}</small>
      </div>
    </article>
  );
}
