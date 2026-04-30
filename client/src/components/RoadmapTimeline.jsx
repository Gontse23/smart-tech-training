import { Icon } from "../utils/icons.js";

export default function RoadmapTimeline({ months = [], currentIndex = 2 }) {
  return (
    <div className="roadmap-timeline">
      {months.map((item, index) => (
        <article className={`roadmap-step ${index < currentIndex ? "done" : index === currentIndex ? "active" : ""}`} key={item.month}>
          <div className="roadmap-marker">
            <Icon name={index < currentIndex ? "Check" : "Route"} size={18} />
          </div>
          <div>
            <span>{item.month}</span>
            <h3>{item.title}</h3>
            <p>{item.outcome}</p>
            <div className="tag-row">
              {item.skills.map((skill) => (
                <small key={skill}>{skill}</small>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
