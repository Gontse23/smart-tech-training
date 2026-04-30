import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import BrandLogo from "./BrandLogo.jsx";
import { Icon } from "../utils/icons.js";

const learnerLinks = [
  { to: "/app/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { to: "/app/roadmap", label: "Roadmap", icon: "Route" },
  { to: "/app/courses", label: "Courses", icon: "BookOpen" },
  { to: "/app/pricing", label: "Pricing", icon: "Trophy" },
  { to: "/app/profile", label: "Profile", icon: "User" }
];

export default function AppShell({ admin = false }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const links = admin ? [{ to: "/admin", label: "Admin", icon: "ShieldCheck" }] : learnerLinks;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <BrandLogo to={null} />

        <nav className="side-nav" aria-label={admin ? "Admin navigation" : "Learner navigation"}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)} end={link.to === "/admin"}>
              <Icon name={link.icon} size={18} />
              <span>{link.label}</span>
            </NavLink>
          ))}
          {user?.role === "admin" && !admin ? (
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
              <Icon name="ShieldCheck" size={18} />
              <span>Admin</span>
            </NavLink>
          ) : null}
        </nav>

        <div className="sidebar-card">
          <span className="mini-label">Current plan</span>
          <strong>{user?.planId || "basic"}</strong>
          <small>WhatsApp support included. Payments can be wired to PayFast, Yoco, or Stripe.</small>
        </div>
      </aside>

      <main className="app-main">
        <header className="topbar">
          <button className="icon-button mobile-menu" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation">
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
          <div>
            <span className="mini-label">{admin ? "Admin workspace" : "Learner workspace"}</span>
            <h1>{admin ? "Smart Tech Training Control Room" : "Your Tech Learning Journey"}</h1>
          </div>
          <div className="topbar-actions">
            <div className="user-chip">
              <span>{user?.name?.slice(0, 1) || "U"}</span>
              <div>
                <strong>{user?.name}</strong>
                <small>{user?.role}</small>
              </div>
            </div>
            <button className="icon-button" type="button" onClick={handleLogout} aria-label="Log out">
              <Icon name="LogOut" size={18} />
            </button>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
