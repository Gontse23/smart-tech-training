import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BrandLogo from "../components/BrandLogo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await register(form);
      navigate("/app/dashboard");
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
        <h1>Create your learner account</h1>
        <p>Your account starts with practical mentor-led tech training.</p>
        <label>
          Full name
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            required
          />
        </label>
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
            minLength={8}
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </label>
        {error ? <div className="form-error">{error}</div> : null}
        <button className="button button-primary" type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Register"}
        </button>
        <p className="auth-link">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}
