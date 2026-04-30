import { useState } from "react";
import { apiFetch } from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    title: user?.profile?.title || "",
    city: user?.profile?.city || "",
    goal: user?.profile?.goal || ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const payload = await apiFetch("/api/profile", {
        method: "PUT",
        body: {
          name: form.name,
          profile: {
            title: form.title,
            city: form.city,
            goal: form.goal
          }
        }
      });
      setUser(payload.user);
      setMessage("Profile updated.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page-stack">
      <div className="page-title">
        <span>Learner profile</span>
        <h2>Keep your learning goal visible</h2>
      </div>
      <article className="panel learner-rules">
        <h3>Learning rules</h3>
        <ul>
          <li>Each quiz contains at least 20 questions and must be passed to update progress.</li>
          <li>Every course includes cheat sheets and things-to-know notes inside the lesson reader.</li>
          <li>Sessions unlock in order, and the next chapter stays locked until the quiz checkpoint is passed.</li>
        </ul>
      </article>
      <form className="profile-form panel" onSubmit={submit}>
        <label>
          Name
          <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
        </label>
        <label>
          Profile title
          <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
        </label>
        <label>
          City
          <input value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} />
        </label>
        <label>
          Learning goal
          <textarea value={form.goal} onChange={(event) => setForm((current) => ({ ...current, goal: event.target.value }))} />
        </label>
        {message ? <div className="form-success">{message}</div> : null}
        {error ? <div className="form-error">{error}</div> : null}
        <button className="button button-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update profile"}
        </button>
      </form>
    </section>
  );
}
