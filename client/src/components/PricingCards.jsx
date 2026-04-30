import { Link } from "react-router-dom";
import { Icon } from "../utils/icons.js";

export default function PricingCards({ plans = [], publicView = false }) {
  const formatPrice = (price) => `R${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <div className="pricing-grid">
      {plans.map((plan) => (
        <article className={`pricing-card ${plan.highlight ? "highlight" : ""}`} key={plan.id}>
          <div className="pricing-head">
            <h3>{plan.name}</h3>
            {plan.highlight ? <span>Most popular</span> : null}
          </div>
          <div className="price">
            {formatPrice(plan.price)}
            <small>/{plan.cadence}</small>
          </div>
          <ul>
            {plan.includes.map((item) => (
              <li key={item}>
                <Icon name="Check" size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link className={plan.highlight ? "button button-primary" : "button button-ghost"} to={publicView ? "/register" : "/app/profile"}>
            Choose plan
          </Link>
        </article>
      ))}
    </div>
  );
}
