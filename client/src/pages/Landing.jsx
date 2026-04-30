import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api.js";
import BrandLogo from "../components/BrandLogo.jsx";
import DashboardPreview from "../components/DashboardPreview.jsx";
import PricingCards from "../components/PricingCards.jsx";
import { Icon } from "../utils/icons.js";

const careerPaths = [
  { title: "Data Analyst", tools: "Excel, SQL, Python, Power BI", outcome: "Analyze operations and business performance." },
  { title: "Web Developer", tools: "HTML, CSS, JavaScript, APIs", outcome: "Build responsive websites and portfolio-ready frontend projects." },
  { title: "Python Programmer", tools: "Python, files, APIs, automation", outcome: "Automate tasks and solve practical technical problems." },
  { title: "Network Support Technician", tools: "TCP/IP, DNS, troubleshooting", outcome: "Understand and diagnose common network issues." },
  { title: "Cybersecurity Starter", tools: "MFA, phishing awareness, security hygiene", outcome: "Build safer habits and entry-level security foundations." },
  { title: "Microsoft Office Specialist", tools: "Excel, Word, PowerPoint", outcome: "Work confidently with core business productivity tools." }
];

const faqs = [
  ["Is this beginner friendly?", "Yes. Learners can start with computer basics, Microsoft packages, web fundamentals, Python, networking, security, or the data analyst roadmap."],
  ["How does certification work?", "Smart Tech Training focuses on practical training and certification prep. Learners buy vendor exams directly from providers such as Microsoft."],
  ["Can Smart Tech add more courses?", "Yes. Admins can add, edit, and delete courses from the control room."],
  ["Are payments live?", "The app includes pricing and payment/subscription placeholders ready for PayFast, Yoco, or Stripe integration."]
];

export default function Landing() {
  const [bootstrap, setBootstrap] = useState({ pricingPlans: [], courses: [] });

  useEffect(() => {
    apiFetch("/api/bootstrap")
      .then(setBootstrap)
      .catch(() => setBootstrap({ pricingPlans: [], courses: [] }));
  }, []);

  return (
    <div className="site-page">
      <header className="site-header">
        <BrandLogo />
        <nav aria-label="Main navigation">
          <a href="#paths">Career paths</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="site-actions">
          <Link className="button button-ghost" to="/login">
            Log in
          </Link>
          <Link className="button button-primary" to="/register">
            Start learning
          </Link>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <h1>Smart Tech Training</h1>
            <p className="hero-tagline">Learn Tech. Build Skills. Become Job Ready.</p>
            <p>
              Mentor-led online training for Data Analysis, Web Development, Python, Networking, Security, and Microsoft
              Packages with structured roadmaps, interactive quizzes, portfolio projects, progress tracking, and vendor certification prep.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/register">
                Create learner account
              </Link>
              <Link className="button button-ghost" to="/login">
                Use demo account
              </Link>
            </div>
            <div className="hero-proof">
              {["Data Analysis", "Web Dev", "Python", "Networking", "Security"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <DashboardPreview />
        </section>

        <section className="section-band">
          <div className="section-heading">
            <span>Platform</span>
            <h2>Everything learners need to keep moving</h2>
            <p>
              Lessons, quizzes, assignments, roadmaps, progress, WhatsApp support, and certification prep sit inside one practical tech learning workspace.
            </p>
          </div>
          <div className="feature-grid">
            {[
              ["Route", "Structured roadmaps", "Clear learning paths for data, coding, networking, security, Microsoft tools, and portfolio projects."],
              ["ClipboardCheck", "Interactive quizzes", "Multiple-choice checks with scoring, pass marks, retries, and progress updates."],
              ["GraduationCap", "Certification prep", "Prepare for Microsoft PL-300, Azure Data Fundamentals, SQL tests, and data science portfolio reviews."],
              ["ShieldCheck", "Admin controls", "Smart Tech admins can manage courses, users, pricing, certification tracks, and analytics."]
            ].map(([icon, title, body]) => (
              <article className="feature-card" key={title}>
                <Icon name={icon} size={22} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="split-section" id="paths">
          <div>
            <span className="section-label">Career paths</span>
            <h2>Built for practical tech career outcomes</h2>
            <p>
              Learners build confidence in the same tools they will use in entry-level support, development, analytics,
              office productivity, and security-aware business environments.
            </p>
          </div>
          <div className="path-list">
            {careerPaths.map((path) => (
              <article key={path.title}>
                <Icon name="Target" size={18} />
                <div>
                  <h3>{path.title}</h3>
                  <p>{path.outcome}</p>
                  <span>{path.tools}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-band" id="pricing">
          <div className="section-heading">
            <span>Pricing</span>
            <h2>Plans for self-paced learners and mentorship</h2>
          </div>
          <PricingCards plans={bootstrap.pricingPlans} publicView />
        </section>

        <section className="split-section">
          <div>
            <span className="section-label">Testimonials</span>
            <h2>Designed for momentum</h2>
          </div>
          <div className="testimonial-grid">
            {[
              ["The roadmap made SQL less intimidating because every lesson led to a small practical task.", "Thando, learner"],
              ["The admin dashboard gives us a simple way to see who needs support before they fall behind.", "Smart Tech mentor"],
              ["I finally had enough project structure to explain my work in interviews.", "Anele, graduate"]
            ].map(([quote, name]) => (
              <blockquote key={name}>
                <p>{quote}</p>
                <cite>{name}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="section-heading">
            <span>FAQ</span>
            <h2>Answers before enrolment</h2>
          </div>
          <div className="faq-grid">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <h2>Start your Smart Tech Training journey today</h2>
          <p>Use the learner demo or register your own account to explore courses, quizzes, progress, and certification prep.</p>
          <Link className="button button-primary" to="/register">
            Join Smart Tech Training
          </Link>
        </section>
      </main>
    </div>
  );
}
