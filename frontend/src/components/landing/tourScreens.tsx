import { useEffect, useRef, useState, type ReactNode } from "react";
import { chatScripts } from "@/content";
import {
  LayoutDashboard, Activity, Bell, FileText, ShieldAlert, FolderLock, Layers, BarChart3, Bot,
  CheckCircle2, AlertTriangle, XCircle, Clock, FileDown, ChevronRight,
} from "lucide-react";

/* ---------- shared bits ---------- */
function Chip({ tone, children }: { tone: "green" | "amber" | "red" | "purple"; children: ReactNode }) {
  const map = {
    green: "bg-sg-green-bg text-sg-green",
    amber: "bg-sg-amber-bg text-sg-amber",
    red: "bg-white text-sg-red ring-1 ring-sg-red",
    purple: "bg-sg-tint text-sg-primary",
  };
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${map[tone]}`}>{children}</span>;
}

function Hotspot({ label, className }: { label: string; className: string }) {
  return (
    <span className={`group/h absolute z-20 ${className}`}>
      <span className="sg-hotspot relative block h-3.5 w-3.5 cursor-help rounded-full bg-sg-violet-400 ring-2 ring-white/70" />
      <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-48 -translate-x-1/2 rounded-lg bg-sg-ink-950 px-3 py-2 text-[11px] leading-snug text-white opacity-0 shadow-xl transition-opacity group-hover/h:opacity-100">
        {label}
      </span>
    </span>
  );
}

function Bar({ pct, tone = "bg-sg-primary" }: { pct: number; tone?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-sg-tint">
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Donut({ pct, color = "#4C1B8C", size = 44 }: { pct: number; color?: string; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEE9FF" strokeWidth="5" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="700" fill="#1B1523">{pct}%</text>
    </svg>
  );
}

function Card({ title, action, children, className = "", hotspot }: { title?: string; action?: string; children: ReactNode; className?: string; hotspot?: { label: string; className: string } }) {
  return (
    <div className={`relative rounded-xl border border-[#E9E3F5] bg-white p-4 shadow-[0_4px_20px_rgba(34,10,67,0.04)] ${className}`}>
      {hotspot && <Hotspot label={hotspot.label} className={hotspot.className} />}
      {title && (
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-sg-text">{title}</p>
          {action && <span className="cursor-pointer text-xs font-medium text-sg-primary hover:underline">{action}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------- screens ---------- */
export function DashboardScreen() {
  const mods = [
    { icon: Layers, t: "Requirements Consolidation", d: "One framework across 7 regimes" },
    { icon: Activity, t: "Risk & Readiness", d: "Honest scores, live posture" },
    { icon: BarChart3, t: "Strategy & Roadmap", d: "Your 12-month plan" },
    { icon: ShieldAlert, t: "Supplier Risk", d: "3 assessments in flight" },
    { icon: Bot, t: "Virtual Cyber Advisor", d: "Ask anything, any time" },
    { icon: FileText, t: "Policy Library", d: "14 policies, all current" },
  ];
  return (
    <div>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-sg-text">Jump to any module</h3>
          <p className="text-xs text-sg-muted">Demo Company Ltd · Last assessment 3 days ago</p>
        </div>
        <Chip tone="green">On track</Chip>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {mods.map((m, i) => (
          <Card key={m.t} hotspot={i === 0 ? { label: "Every obligation merged into one prioritised control set.", className: "-right-1 -top-1" } : undefined}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sg-tint">
              <m.icon className="h-4.5 w-4.5 h-[18px] w-[18px] text-sg-primary" strokeWidth={1.8} />
            </div>
            <p className="mt-3 text-sm font-semibold text-sg-text">{m.t}</p>
            <p className="mt-0.5 text-xs text-sg-muted">{m.d}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function MonitoringScreen() {
  const regs = [
    { n: "NIS2", s: 41, t: "amber" as const }, { n: "GDPR", s: 63, t: "green" as const },
    { n: "ISO 27001", s: 52, t: "amber" as const }, { n: "CRA", s: 18, t: "red" as const },
  ];
  const lacking = [
    { r: "Multi-factor authentication for remote access", n: "NIS2 Art. 21", l: "Critical", s: "Not demonstrated" },
    { r: "Incident response plan tested annually", n: "ISO 27001 A.5.26", l: "High", s: "Pending" },
    { r: "Supplier security reviews", n: "GDPR Art. 28", l: "Medium", s: "Active" },
    { r: "Cryptography policy", n: "NIS2 Art. 21", l: "High", s: "Pending" },
  ];
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      <Card
        className="lg:col-span-2"
        title="Assurance score"
        hotspot={{ label: "Honest scoring: a floor, not a ceiling — the gap is what we haven't asked about yet.", className: "right-3 top-3" }}
      >
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="font-heading text-4xl font-extrabold text-sg-red">6.3% <span className="text-base font-semibold">assured</span></p>
            <div className="mt-2"><Chip tone="red">Not demonstrated</Chip></div>
          </div>
          <div className="min-w-[220px] flex-1 space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-[11px] text-sg-muted"><span>Of what we measured</span><span>50%</span></div>
              <Bar pct={50} />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-[11px] text-sg-muted"><span>How much we can measure</span><span>12.5%</span></div>
              <Bar pct={12.5} tone="bg-sg-electric" />
            </div>
          </div>
        </div>
        <p className="mt-3 rounded-lg bg-sg-canvas p-3 text-xs leading-relaxed text-sg-muted">
          This is a floor, not a ceiling. The gap is what we haven't asked about yet — not something you are failing.
        </p>
        <p className="mt-3 text-xs font-semibold text-sg-text">What would move it most</p>
        <ul className="mt-2 space-y-1.5 text-xs text-sg-muted">
          {["Complete the access-control section", "Upload your incident response plan", "Answer 4 supplier questions"].map((x) => (
            <li key={x} className="flex items-center gap-2"><ChevronRight className="h-3 w-3 text-sg-primary" />{x}</li>
          ))}
        </ul>
      </Card>

      <div className="space-y-3">
        <Card title="Compliance Index">
          <div className="flex items-center gap-4">
            <Donut pct={78} size={64} />
            <div>
              <Chip tone="amber">Medium</Chip>
              <p className="mt-1.5 text-[11px] leading-snug text-sg-muted">Up 6 points this month across all frameworks.</p>
            </div>
          </div>
        </Card>
        <Card title="Why these apply" hotspot={{ label: "Every regulation comes with its reasoning — no black box.", className: "right-3 top-3" }}>
          <ul className="space-y-1.5 text-[11px] text-sg-muted">
            <li className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-sg-green" />NIS2 — 50+ staff, essential-services supply chain</li>
            <li className="flex gap-1.5"><CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-sg-green" />GDPR — processing EU personal data</li>
            <li className="flex gap-1.5"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-sg-amber" />2 rules cannot be checked yet</li>
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:col-span-3 lg:grid-cols-4">
        {regs.map((r) => (
          <Card key={r.n}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-sg-text">{r.n}</p>
              <Chip tone={r.t}>{r.t === "red" ? "Critical" : r.t === "amber" ? "Medium" : "Active"}</Chip>
            </div>
            <p className="mt-2 font-heading text-2xl font-bold text-sg-text">{r.s}%</p>
            <div className="mt-1.5"><Bar pct={r.s} tone={r.t === "red" ? "bg-sg-red" : r.t === "amber" ? "bg-sg-amber" : "bg-sg-green"} /></div>
          </Card>
        ))}
      </div>

      <Card className="lg:col-span-3" title="Top Lacking Requirements" action="See All">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E9E3F5] text-[10px] uppercase tracking-wider text-sg-muted">
                <th className="pb-2 pr-4 font-medium">Requirement</th><th className="pb-2 pr-4 font-medium">Needed for</th><th className="pb-2 pr-4 font-medium">Level</th><th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {lacking.map((r) => (
                <tr key={r.r} className="border-b border-[#E9E3F5]/60 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-sg-text">{r.r}</td>
                  <td className="py-2.5 pr-4 text-sg-muted">{r.n}</td>
                  <td className="py-2.5 pr-4"><Chip tone={r.l === "Critical" ? "red" : r.l === "High" ? "amber" : "purple"}>{r.l}</Chip></td>
                  <td className="py-2.5"><Chip tone={r.s === "Active" ? "green" : r.s === "Pending" ? "amber" : "red"}>{r.s}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function AlertsScreen() {
  const [reg, setReg] = useState(0);
  const regs = ["NIS2", "GDPR", "DORA"];
  const domains = [
    { n: "Governance", f: 3, p: 62 }, { n: "Security", f: 8, p: 41 },
    { n: "Incident", f: 2, p: 70 }, { n: "Supervision", f: 0, p: 100 }, { n: "Enforcement", f: 1, p: 85 },
  ];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-sg-text">Alert Center</h3>
          <p className="text-xs text-sg-muted">Open findings by regulation and domain</p>
        </div>
        <span className="font-mono text-xs text-sg-muted">{regs[reg]} · {reg + 1}/{regs.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {domains.map((d, i) => (
          <Card key={d.n} hotspot={i === 1 ? { label: "Findings are grouped by domain so you always know who owns the fix.", className: "-right-1 -top-1" } : undefined}>
            <Donut pct={Math.max(4, d.p - reg * 9)} size={44} color={d.f > 5 ? "#DC2626" : d.f > 0 ? "#B7791F" : "#15803D"} />
            <p className="mt-2 text-xs font-semibold text-sg-text">{d.n}</p>
            <p className="text-[11px] text-sg-muted">{Math.max(0, d.f - reg)} findings</p>
          </Card>
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Regulation">
        {regs.map((r, i) => (
          <button
            key={r}
            role="tab"
            aria-selected={reg === i}
            data-testid={`alerts-dot-${r.toLowerCase()}`}
            onClick={() => setReg(i)}
            className={`h-2 rounded-full transition-all ${reg === i ? "w-6 bg-sg-primary" : "w-2 bg-sg-violet-400/40 hover:bg-sg-violet-400"}`}
            aria-label={r}
          />
        ))}
      </div>
    </div>
  );
}

export function PoliciesScreen() {
  const policies = [
    { n: "Information Security Policy", v: "v2.1", o: "CISO", s: "Active" },
    { n: "Access Control Policy", v: "v1.4", o: "IT Manager", s: "Active" },
    { n: "Incident Response Plan", v: "v1.2", o: "IT Manager", s: "Pending review" },
    { n: "Data Classification Policy", v: "v1.0", o: "DPO", s: "Active" },
    { n: "Supplier Security Policy", v: "v0.9", o: "Operations", s: "Draft" },
  ];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-sg-text">Policy Library</h3>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-sg-primary px-3 py-1.5 text-xs font-semibold text-white">+ New policy</span>
      </div>
      <div className="space-y-2">
        {policies.map((p, i) => (
          <div key={p.n} className="relative flex items-center gap-4 rounded-xl border border-[#E9E3F5] bg-white p-3.5">
            {i === 2 && <Hotspot label="Version-controlled: every change has an owner and an audit trail." className="-right-1 -top-1" />}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sg-tint">
              <FileText className="h-[18px] w-[18px] text-sg-primary" strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-sg-text">{p.n}</p>
              <p className="text-[11px] text-sg-muted">{p.v} · Owner: {p.o}</p>
            </div>
            <Chip tone={p.s === "Active" ? "green" : p.s === "Draft" ? "purple" : "amber"}>{p.s}</Chip>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RisksScreen() {
  const risks = [
    { r: "Phishing leading to credential theft", l: "High", i: "High", s: 16, o: "IT Manager", c: "A.5.17, A.8.5" },
    { r: "Unpatched remote-access VPN", l: "Medium", i: "High", s: 12, o: "IT Manager", c: "A.8.20" },
    { r: "Supplier data breach", l: "Medium", i: "High", s: 12, o: "Operations", c: "A.5.22" },
    { r: "Ransomware on file server", l: "Low", i: "High", s: 8, o: "IT Manager", c: "A.8.13" },
    { r: "Lost laptop with local data", l: "Medium", i: "Medium", s: 9, o: "All staff", c: "A.7.9" },
    { r: "Misconfigured cloud storage", l: "Medium", i: "Medium", s: 9, o: "IT Manager", c: "A.8.9" },
  ];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-sg-text">Risk Register</h3>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-sg-primary px-3 py-1.5 text-xs font-semibold text-white">+ Add risk</span>
      </div>
      <Card hotspot={{ label: "Every risk links to the controls that treat it — across frameworks.", className: "right-3 top-3" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E9E3F5] text-[10px] uppercase tracking-wider text-sg-muted">
                <th className="pb-2 pr-4 font-medium">Risk</th><th className="pb-2 pr-4 font-medium">Likelihood</th><th className="pb-2 pr-4 font-medium">Impact</th><th className="pb-2 pr-4 font-medium">Score</th><th className="pb-2 pr-4 font-medium">Owner</th><th className="pb-2 font-medium">Linked controls</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.r} className="border-b border-[#E9E3F5]/60 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-sg-text">{r.r}</td>
                  <td className="py-2.5 pr-4 text-sg-muted">{r.l}</td>
                  <td className="py-2.5 pr-4 text-sg-muted">{r.i}</td>
                  <td className="py-2.5 pr-4"><Chip tone={r.s >= 15 ? "red" : r.s >= 10 ? "amber" : "green"}>{r.s}</Chip></td>
                  <td className="py-2.5 pr-4 text-sg-muted">{r.o}</td>
                  <td className="py-2.5 font-mono text-[11px] text-sg-primary">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function EvidenceScreen() {
  const files = [
    { n: "mfa-rollout-report.pdf", tags: ["ISO 27001 A.5.17", "NIS2 Art. 21"], d: "12 May 2026" },
    { n: "pen-test-summary-2026.pdf", tags: ["NIS2 Art. 21"], d: "28 Apr 2026" },
    { n: "dpa-acme-hosting-signed.pdf", tags: ["GDPR Art. 28"], d: "14 Apr 2026" },
    { n: "access-review-q1.xlsx", tags: ["ISO 27001 A.5.18"], d: "02 Apr 2026" },
  ];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-sg-text">Evidence Repository</h3>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-sg-primary px-3 py-1.5 text-xs font-semibold text-white">+ Upload</span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {files.map((f, i) => (
          <Card key={f.n} hotspot={i === 0 ? { label: "Tag evidence once — it counts towards every framework it satisfies.", className: "-right-1 -top-1" } : undefined}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sg-tint">
                <FolderLock className="h-[18px] w-[18px] text-sg-primary" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="truncate font-mono text-xs font-semibold text-sg-text">{f.n}</p>
                <p className="text-[11px] text-sg-muted">Uploaded {f.d}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {f.tags.map((t) => <Chip key={t} tone="purple">{t}</Chip>)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function FrameworksScreen() {
  return (
    <div>
      <h3 className="mb-1 font-heading text-lg font-bold text-sg-text">Framework Mapping</h3>
      <p className="mb-4 text-xs text-sg-muted">One control, satisfied everywhere it counts.</p>
      <Card hotspot={{ label: "Implement MFA once — it evidences ISO 27001, NIS2 and GDPR at the same time.", className: "right-3 top-3" }}>
        <svg viewBox="0 0 640 240" className="w-full" role="img" aria-label="Diagram: MFA control maps to ISO 27001 Annex A, NIS2 Article 21 and GDPR Article 32">
          <defs>
            <linearGradient id="sg-sankey" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4C1B8C" /><stop offset="1" stopColor="#0A84FF" />
            </linearGradient>
          </defs>
          {[
            { y1: 120, y2: 40 }, { y1: 120, y2: 120 }, { y1: 120, y2: 200 },
          ].map((l, i) => (
            <path
              key={i}
              d={`M 210 ${l.y1} C 330 ${l.y1}, 330 ${l.y2}, 430 ${l.y2}`}
              fill="none" stroke="url(#sg-sankey)" strokeWidth="10" strokeOpacity="0.35" strokeLinecap="round"
              className="sankey-flow"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
          <style>{`@keyframes sankeypulse { 0%,100% { stroke-opacity: .18; } 50% { stroke-opacity: .55; } } .sankey-flow { animation: sankeypulse 2.8s ease-in-out infinite; }`}</style>
          <g>
            <rect x="20" y="86" width="190" height="68" rx="12" fill="#4C1B8C" />
            <text x="115" y="114" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Multi-Factor Auth</text>
            <text x="115" y="134" textAnchor="middle" fill="#CFC4E4" fontSize="10">SecureGov control SG-AC-04</text>
          </g>
          {[
            { y: 8, t: "ISO 27001 Annex A", s: "A.5.17 Authentication" },
            { y: 88, t: "NIS2 Article 21", s: "21(2)(j) MFA / crypto" },
            { y: 168, t: "GDPR Article 32", s: "Security of processing" },
          ].map((n) => (
            <g key={n.t}>
              <rect x="430" y={n.y} width="190" height="64" rx="12" fill="#fff" stroke="#E9E3F5" />
              <rect x="430" y={n.y} width="5" height="64" rx="2.5" fill="#4C1B8C" />
              <text x="448" y={n.y + 26} fill="#1B1523" fontSize="12" fontWeight="700">{n.t}</text>
              <text x="448" y={n.y + 46} fill="#6E608A" fontSize="10">{n.s}</text>
            </g>
          ))}
        </svg>
      </Card>
    </div>
  );
}

export function ReportsScreen() {
  const [tab, setTab] = useState(0);
  const tabs = ["Report Templates", "Generated Reports", "Scheduled Reports"];
  return (
    <div>
      <h3 className="mb-4 font-heading text-lg font-bold text-sg-text">Reports</h3>
      <div className="mb-4 flex gap-5 border-b border-[#E9E3F5]" role="tablist" aria-label="Report views">
        {tabs.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === i}
            data-testid={`reports-tab-${i}`}
            onClick={() => setTab(i)}
            className={`relative pb-2.5 text-xs font-medium transition-colors ${tab === i ? "text-sg-primary" : "text-sg-muted hover:text-sg-text"}`}
          >
            {t}
            {tab === i && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-sg-primary" />}
          </button>
        ))}
      </div>
      {tab === 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Card hotspot={{ label: "Board-ready output in one click — no manual assembly.", className: "-right-1 -top-1" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg sg-gradient-bg">
                <ShieldIcon />
              </div>
              <div>
                <p className="text-sm font-semibold text-sg-text">Weekly Compliance Report</p>
                <p className="text-[11px] text-sg-muted">Score, findings, roadmap progress</p>
              </div>
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-sg-primary/30 px-3 py-1.5 text-xs font-semibold text-sg-primary">
              <FileDown className="h-3.5 w-3.5" /> Generate
            </span>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sg-tint">
                <BarChart3 className="h-5 w-5 text-sg-primary" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-sg-text">Board Summary Pack</p>
                <p className="text-[11px] text-sg-muted">Plain-English posture for directors</p>
              </div>
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-sg-primary/30 px-3 py-1.5 text-xs font-semibold text-sg-primary">
              <FileDown className="h-3.5 w-3.5" /> Generate
            </span>
          </Card>
        </div>
      )}
      {tab === 1 && (
        <div className="space-y-2">
          {["Weekly Compliance Report — 30 Jun 2026", "Weekly Compliance Report — 23 Jun 2026", "Board Summary — Q2 2026"].map((r) => (
            <div key={r} className="flex items-center justify-between rounded-xl border border-[#E9E3F5] bg-white p-3.5">
              <p className="text-xs font-medium text-sg-text">{r}</p>
              <Chip tone="green">Ready</Chip>
            </div>
          ))}
        </div>
      )}
      {tab === 2 && (
        <div className="flex items-center gap-3 rounded-xl border border-[#E9E3F5] bg-white p-4">
          <Clock className="h-4 w-4 text-sg-primary" />
          <p className="text-xs text-sg-muted">Weekly Compliance Report — every Monday, 08:00, to <span className="font-medium text-sg-text">it@democompany.example</span></p>
        </div>
      )}
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 100 100" className="h-5 w-5" aria-hidden="true">
      <path d="M50 4 L88 19 V50 C88 74 72 88 50 96 C28 88 12 74 12 50 V19 Z" fill="none" stroke="#fff" strokeWidth="8" />
    </svg>
  );
}

export function AdvisorScreen() {
  const [active, setActive] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = (key: string) => {
    if (timer.current) clearInterval(timer.current);
    setActive(key); setText(""); setDone(false);
    const full = chatScripts[key].a;
    let i = 0;
    timer.current = setInterval(() => {
      i += 3;
      setText(full.slice(0, i));
      if (i >= full.length) { if (timer.current) clearInterval(timer.current); setDone(true); }
    }, 24);
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full sg-gradient-bg">
          <Bot className="h-4.5 w-4.5 h-[18px] w-[18px] text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-sg-text">Virtual Cyber Advisor</p>
          <p className="text-[11px] text-sg-muted">Demo responses are illustrative.</p>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {Object.entries(chatScripts).map(([k, s]) => (
          <button
            key={k}
            data-testid={`chat-chip-${k}`}
            onClick={() => play(k)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              active === k ? "border-sg-primary bg-sg-primary text-white" : "border-sg-primary/30 bg-white text-sg-primary hover:bg-sg-tint"
            }`}
          >
            {s.q}
          </button>
        ))}
      </div>

      <div className="min-h-[220px] flex-1 rounded-xl border border-[#E9E3F5] bg-sg-canvas p-4">
        {active === null ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <Bot className="h-8 w-8 text-sg-violet-400" />
            <p className="max-w-xs text-xs text-sg-muted">Pick a suggestion above to see how the Advisor drafts policies, summarises risks and maps controls.</p>
          </div>
        ) : (
          <div className="max-w-[95%] rounded-2xl rounded-tl-sm bg-white p-4 shadow-sm">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-sg-primary">{chatScripts[active].q}</p>
            <p className="whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-sg-text">
              {text}
              {!done && <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-sg-primary align-middle" />}
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2" title="Full assistant available in a live demo">
        <input
          data-testid="chat-input-disabled"
          disabled
          placeholder="Full assistant available in a live demo"
          className="flex-1 cursor-not-allowed rounded-lg border border-[#E9E3F5] bg-sg-canvas px-3.5 py-2.5 text-xs text-sg-muted"
        />
        <span className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg bg-sg-violet-400/40 text-white">
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

export const SCREEN_META = [
  { id: "dashboard", label: "Dashboard", group: "OVERVIEW", icon: LayoutDashboard },
  { id: "monitoring", label: "Monitoring", group: "OVERVIEW", icon: Activity },
  { id: "alerts", label: "Alert Center", group: "OVERVIEW", icon: Bell },
  { id: "policies", label: "Policies", group: "COMPLIANCE", icon: FileText },
  { id: "risks", label: "Risk Register", group: "COMPLIANCE", icon: ShieldAlert },
  { id: "evidence", label: "Evidence", group: "COMPLIANCE", icon: FolderLock },
  { id: "frameworks", label: "Frameworks", group: "COMPLIANCE", icon: Layers },
  { id: "reports", label: "Reports", group: "COMPLIANCE", icon: BarChart3 },
  { id: "advisor", label: "Virtual Advisor", group: "AI", icon: Bot },
] as const;

export type ScreenId = (typeof SCREEN_META)[number]["id"];

export function TourScreen({ id }: { id: ScreenId }) {
  switch (id) {
    case "dashboard": return <DashboardScreen />;
    case "monitoring": return <MonitoringScreen />;
    case "alerts": return <AlertsScreen />;
    case "policies": return <PoliciesScreen />;
    case "risks": return <RisksScreen />;
    case "evidence": return <EvidenceScreen />;
    case "frameworks": return <FrameworksScreen />;
    case "reports": return <ReportsScreen />;
    case "advisor": return <AdvisorScreen />;
  }
}

export { XCircle };
