import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Icon } from "../utils/icons.js";

const previewData = [
  { name: "Web", value: 72 },
  { name: "Python", value: 36 },
  { name: "Network", value: 48 },
  { name: "Security", value: 28 }
];

export default function DashboardPreview() {
  return (
    <div className="hero-product" aria-label="Smart Tech Training product preview">
      <div className="hero-product-header">
        <div>
          <strong>Roadmap progress</strong>
          <span>Smart Tech Bootcamp</span>
        </div>
        <div className="completion-badge">44%</div>
      </div>
      <div className="hero-chart">
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={previewData} barSize={28}>
            <CartesianGrid vertical={false} stroke="rgba(148, 163, 184, .25)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
            <YAxis hide />
            <Tooltip cursor={{ fill: "rgba(57, 255, 136, .08)" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#39FF88" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="hero-task-list">
        {[
          ["JavaScript DOM practice", "Next lesson"],
          ["Networking troubleshooting lab", "Submitted"],
          ["PL-300 prep", "Vendor track"]
        ].map(([title, status]) => (
          <div key={title}>
            <Icon name="ClipboardCheck" size={18} />
            <span>{title}</span>
            <small>{status}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
