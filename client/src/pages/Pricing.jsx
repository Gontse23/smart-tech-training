import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api.js";
import BrandLogo from "../components/BrandLogo.jsx";
import PricingCards from "../components/PricingCards.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";

export default function Pricing({ publicView = false }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    apiFetch("/api/bootstrap")
      .then((data) => {
        setPlans(data.pricingPlans || []);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (publicView) {
    return (
      <main className="site-page public-pricing">
        <header className="site-header">
          <BrandLogo />
          <div className="site-actions">
            <Link className="button button-ghost" to="/login">
              Log in
            </Link>
          </div>
        </header>
        <section className="section-band">
          <div className="section-heading">
            <span>Pricing</span>
            <h1>Choose your Smart Tech Training plan</h1>
            <p>Self-paced learning, WhatsApp support on every plan, certification prep, mentorship, and a once-off bootcamp option.</p>
          </div>
          {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={load} /> : <PricingCards plans={plans} publicView />}
        </section>
      </main>
    );
  }

  return (
    <section className="page-stack">
      <div className="page-title">
        <span>Pricing plans</span>
        <h2>Upgrade learning support when you need it</h2>
      </div>
      {loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={load} /> : <PricingCards plans={plans} />}
    </section>
  );
}
