import { capabilities } from "@/content";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";
import { Reveal } from "./Reveal";
import { FileText, ShieldAlert, FolderLock, Layers, Bot, Building2, Route } from "lucide-react";

const ICONS: Record<string, typeof FileText> = {
  policy: FileText, risk: ShieldAlert, evidence: FolderLock, frameworks: Layers,
  ai: Bot, supplier: Building2, strategy: Route,
};

const SPAN: Record<string, string> = {
  policy: "lg:col-span-7", risk: "lg:col-span-5", evidence: "lg:col-span-4",
  frameworks: "lg:col-span-4", ai: "lg:col-span-4", supplier: "lg:col-span-5", strategy: "lg:col-span-7",
};

function MicroAnim({ kind }: { kind: string }) {
  switch (kind) {
    case "policy":
      return (
        <div className="mt-6 rounded-lg border border-sg-border bg-sg-canvas p-4" aria-hidden="true">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-sg-muted">information-security-policy.md</span>
            <span className="bento-ver rounded-full bg-sg-tint px-2 py-0.5 font-mono text-[10px] font-semibold text-sg-primary" />
          </div>
          {[92, 78, 85, 60].map((w, i) => (
            <div key={i} className="bento-line mb-2 h-1.5 rounded-full bg-sg-primary/25" style={{ width: `${w}%`, animationDelay: `${i * 0.35}s` }} />
          ))}
        </div>
      );
    case "risk":
      return (
        <div className="mt-6 grid max-w-[150px] grid-cols-3 gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bento-heat h-8 rounded-md" style={{ animationDelay: `${i * 0.45}s` }} />
          ))}
        </div>
      );
    case "evidence":
      return (
        <div className="mt-6 flex items-center gap-3" aria-hidden="true">
          <div className="bento-drop flex h-11 w-11 items-center justify-center rounded-lg border border-dashed border-sg-primary/40 bg-sg-tint">
            <FolderLock className="h-5 w-5 text-sg-primary" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="bento-tag rounded-full bg-sg-green-bg px-2.5 py-0.5 text-[10px] font-semibold text-sg-green" style={{ animationDelay: "0.6s" }}>ISO 27001 A.5.15</span>
            <span className="bento-tag rounded-full bg-sg-tint px-2.5 py-0.5 text-[10px] font-semibold text-sg-primary" style={{ animationDelay: "1.1s" }}>NIS2 Art. 21</span>
          </div>
        </div>
      );
    case "frameworks":
      return (
        <div className="mt-6 flex h-16 items-end" aria-hidden="true">
          {["ISO 27001", "ISO 42001", "NIS2", "CyFun", "GDPR"].map((f, i) => (
            <div
              key={f}
              className="bento-fan -ml-2 flex h-14 w-20 origin-bottom items-start rounded-lg border border-sg-primary/20 bg-white p-1.5 shadow-md transition-transform duration-500 first:ml-0 group-hover:rotate-0"
              style={{ transform: `rotate(${(i - 2) * 7}deg)`, zIndex: i }}
            >
              <span className="font-mono text-[8px] font-semibold text-sg-primary">{f}</span>
            </div>
          ))}
        </div>
      );
    case "ai":
      return (
        <div className="mt-6" aria-hidden="true">
          <div className="mb-2 ml-auto flex w-fit gap-1 rounded-2xl rounded-tr-sm bg-sg-tint px-3 py-2">
            <span className="sg-typing-dot h-1.5 w-1.5 rounded-full bg-sg-primary" />
            <span className="sg-typing-dot h-1.5 w-1.5 rounded-full bg-sg-primary" />
            <span className="sg-typing-dot h-1.5 w-1.5 rounded-full bg-sg-primary" />
          </div>
          <div className="bento-reply w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-sg-primary px-3 py-2 text-[11px] leading-snug text-white">
            Mapped to NIS2 Art. 21(2)(j) — three controls suggested.
          </div>
        </div>
      );
    case "supplier":
      return (
        <div className="mt-6 flex items-center gap-8" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative flex h-12 w-12 items-center justify-center rounded-full border border-sg-primary/25 bg-white">
              <Building2 className="h-5 w-5 text-sg-primary" />
              <span className="sg-hotspot absolute inset-0 rounded-full" style={{ animationDelay: `${i * 0.6}s` }} />
            </div>
          ))}
          <span className="rounded-full bg-sg-amber-bg px-2.5 py-1 text-[10px] font-semibold text-sg-amber">1 review due</span>
        </div>
      );
    case "strategy":
      return (
        <div className="mt-6" aria-hidden="true">
          <div className="relative h-2 overflow-hidden rounded-full bg-sg-tint">
            <div className="bento-bar absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sg-primary to-sg-electric" />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] text-sg-muted">
            <span>Month 1–3</span><span>4–6</span><span>7–9</span><span>10–12</span><span>Ongoing</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function CapabilitiesBento() {
  return (
    <section id="features" data-testid="features-section" className="bg-sg-canvas py-28">
      <style>{`
        @keyframes bento-line { 0% { transform: scaleX(0); opacity: .3; } 60% { transform: scaleX(1); opacity: 1; } 100% { transform: scaleX(1); opacity: 1; } }
        .bento-line { transform-origin: left; animation: bento-line 3.4s ease-in-out infinite; }
        @keyframes bento-heat { 0%, 100% { background: #FEE2E2; } 50% { background: #DCFCE7; } 25% { background: #FEF3C7; } }
        .bento-heat { animation: bento-heat 5.5s ease-in-out infinite; }
        @keyframes bento-drop { 0% { transform: translateY(-14px); opacity: 0; } 20%, 85% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(0); opacity: 0; } }
        .bento-drop { animation: bento-drop 4s ease-in-out infinite; }
        @keyframes bento-tag { 0%, 15% { transform: scale(.6); opacity: 0; } 30%, 88% { transform: scale(1); opacity: 1; } 100% { opacity: 0; } }
        .bento-tag { animation: bento-tag 4s ease-in-out infinite; }
        @keyframes bento-reply { 0%, 35% { opacity: 0; transform: translateY(6px); } 50%, 92% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; } }
        .bento-reply { animation: bento-reply 4.5s ease-in-out infinite; }
        @keyframes bento-bar { 0% { width: 4%; } 55% { width: 78%; } 100% { width: 4%; } }
        .bento-bar { animation: bento-bar 5s ease-in-out infinite; }
        @keyframes bento-ver { 0%, 45% { content: "v1.2"; } }
        .bento-ver::after { content: "v1.2"; animation: bento-vertext 4s steps(1) infinite; }
        @keyframes bento-vertext { 0%, 49% { content: "v1.2"; } 50%, 100% { content: "v1.3"; } }
      `}</style>
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <SectionHeading
          eyebrow="WHAT SECUREGOV AI DOES"
          title="Everything governance needs, in one place"
          sub="Policies, risks, controls and evidence — automated, prioritised and explained in plain language."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {capabilities.map((c, i) => {
            const Icon = ICONS[c.id];
            return (
              <Reveal key={c.id} delay={(i % 3) * 0.08} className={SPAN[c.id]}>
                <TiltCard
                  testId={`bento-tile-${c.id}`}
                  className="h-full rounded-xl border border-[#E9E3F5] bg-white p-6 shadow-[0_6px_28px_rgba(34,10,67,0.05)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sg-tint">
                    <Icon className="h-5 w-5 text-sg-primary" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-sg-text">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-sg-muted">{c.desc}</p>
                  <MicroAnim kind={c.anim} />
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
