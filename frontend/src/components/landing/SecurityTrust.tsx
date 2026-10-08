import { securityPoints, securityTagline } from "@/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Logo } from "./Logo";
import { BadgeCheck, Lock, KeyRound, ScrollText, Globe2, ShieldCheck } from "lucide-react";

const ICONS = [BadgeCheck, Lock, KeyRound, ScrollText, Globe2, ShieldCheck];

export function SecurityTrust() {
  return (
    <section id="security" data-testid="security-section" className="relative overflow-hidden bg-sg-ink-950 py-28">
      <div className="sg-hex-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-sg-primary/25 blur-[130px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              dark
              eyebrow="SECURITY & TRUST"
              title="Governance you can defend in front of any auditor"
              sub="We hold ourselves to the same standard we help you reach."
            />
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {securityPoints.map((p, i) => {
                const Icon = ICONS[i];
                return (
                  <Reveal key={p.title} delay={i * 0.06}>
                    <div className="sg-glass flex gap-3.5 rounded-xl p-4" data-testid={`security-point-${i}`}>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sg-primary/50">
                        <Icon className="h-4.5 w-4.5 h-[18px] w-[18px] text-sg-violet-400" strokeWidth={1.8} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{p.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-sg-violet-300/80">{p.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-10 font-heading text-lg font-bold text-sg-violet-400">{securityTagline}</p>
            </Reveal>
          </div>

          <Reveal className="hidden lg:block">
            <div className="relative mx-auto flex h-[440px] w-[440px] items-center justify-center" aria-hidden="true">
              <div className="absolute h-72 w-72 rounded-full bg-sg-primary/40 blur-[100px]" />
              <div className="sg-glow-pulse flex h-52 w-52 items-center justify-center rounded-[2.5rem] border border-sg-violet-400/30 bg-sg-ink-900/70">
                <Logo variant="white" withWordmark={false} className="[&_svg]:h-28 [&_svg]:w-28" />
              </div>
              <div className="sg-spin-slow absolute inset-0">
                {["ISO 27001", "ISO 42001", "GDPR", "EU HOSTED"].map((b, i) => (
                  <span
                    key={b}
                    className="sg-spin-rev absolute flex items-center gap-1.5 rounded-full border border-sg-violet-400/40 bg-sg-ink-900/90 px-3.5 py-1.5 font-mono text-[10px] font-semibold tracking-wider text-sg-violet-300"
                    style={{
                      top: `${50 + 46 * Math.sin((i * Math.PI) / 2)}%`,
                      left: `${50 + 46 * Math.cos((i * Math.PI) / 2)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <BadgeCheck className="h-3 w-3 text-sg-electric" />{b}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
