import { Link } from "react-router-dom";

export default function BrandLogo({ to = "/", className = "" }) {
  const content = (
    <>
      <svg className="brand-emblem" viewBox="0 0 64 64" role="img" aria-label="Smart Tech Training logo">
        <defs>
          <linearGradient id="smartTechLogoGradient" x1="10" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00A8FF" />
            <stop offset="1" stopColor="#39FF88" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#smartTechLogoGradient)" />
        <path
          d="M43 18H27.5C22.8 18 20 20.7 20 24.4C20 28.2 22.9 30.5 27.2 30.5H36.8C41.4 30.5 44 33.2 44 37C44 41.1 40.9 43.5 36.2 43.5H20.5"
          fill="none"
          stroke="#F8FDFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path d="M43.5 20.5H51V28" fill="none" stroke="#062239" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
        <path d="M20.5 43.5H13V36" fill="none" stroke="#062239" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
        <circle cx="51" cy="28" r="3.2" fill="#F8FDFF" />
        <circle cx="13" cy="36" r="3.2" fill="#F8FDFF" />
      </svg>
      <div>
        <strong>Smart Tech</strong>
        <span>Training</span>
      </div>
    </>
  );

  if (!to) {
    return <div className={`brand-block brand-logo ${className}`.trim()}>{content}</div>;
  }

  return (
    <Link className={`brand-block brand-logo ${className}`.trim()} to={to}>
      {content}
    </Link>
  );
}
