import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BrandLogo from "../components/BrandLogo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const demoAccounts = [
  { label: "Learner demo", email: "learner@smarttechtraining.co.za", password: "Learner123!" },
  { label: "Admin demo", email: "admin@smarttechtraining.co.za", password: "Admin123!" }
];

export default function Login() {
  const [form, setForm] = useState({ email: demoAccounts[0].email, password: demoAccounts[0].password });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : "/app/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <BrandLogo />
      <form className="auth-card" onSubmit={submit}>
        <h1>Welcome back</h1>
        <p>Log in to continue your Smart Tech Training path.</p>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </label>
        {error ? <div className="form-error">{error}</div> : null}
        <button className="button button-primary" type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Log in"}
        </button>

        <div className="demo-row">
          {demoAccounts.map((account) => (
            <button className="button button-ghost" type="button" key={account.label} onClick={() => setForm(account)}>
              {account.label}
            </button>
          ))}
        </div>

        <p className="auth-link">
          New learner? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
