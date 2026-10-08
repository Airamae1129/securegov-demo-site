import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { modules } from "@/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const POS = [
  { x: 400, y: 58 },
  { x: 688, y: 185 },
  { x: 585, y: 440 },
  { x: 215, y: 440 },
  { x: 112, y: 185 },
];
const C = { x: 400, y: 255 };

export function SolutionHub() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGPathElement>(".hub-line").forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 1.1,
          delay: i * 0.18,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        });
      });
      gsap.fromTo(
        ".hub-pill",
        { opacity: 0, scale: 0.6, y: 22 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.16, ease: "back.out(1.8)",
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-sg-canvas py-28" data-testid="solution-hub-section">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <SectionHeading
          eyebrow="THE SOLUTION"
          title="Five modules. One AI engine."
          sub="SecureGov AI runs your whole governance programme from one hub — not five piecemeal tools."
        />

        <div ref={ref} className="relative mx-auto mt-10 hidden max-w-4xl md:block" style={{ height: 500 }}>
          <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="hubgrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7C4DDB" />
                <stop offset="1" stopColor="#0A84FF" />
              </linearGradient>
            </defs>
            {POS.map((p, i) => (
              <path
                key={i}
                className="hub-line"
                d={`M ${C.x} ${C.y} Q ${(C.x + p.x) / 2} ${(C.y + p.y) / 2 - 40} ${p.x} ${p.y}`}
                fill="none"
                stroke="url(#hubgrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
            {POS.map((p, i) => (
              <path
                key={`pulse-${i}`}
                d={`M ${C.x} ${C.y} Q ${(C.x + p.x) / 2} ${(C.y + p.y) / 2 - 40} ${p.x} ${p.y}`}
                fill="none"
                stroke="#A98BF0"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="4 120"
                className="hub-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </svg>
          <style>{`@keyframes hubdash { to { stroke-dashoffset: -124; } } .hub-pulse { animation: hubdash 2.6s linear infinite; opacity: .8; }`}</style>

          <div className="sg-glow-pulse absolute flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full sg-gradient-bg text-center shadow-2xl" style={{ left: C.x, top: C.y }}>
            <span className="font-heading text-sm font-extrabold tracking-wider text-white">SECUREGOV</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-sg-violet-300">AI ENGINE</span>
          </div>

          {modules.map((m, i) => (
            <div
              key={m.id}
              className="hub-pill absolute w-52 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-sg-primary/15 bg-white p-3.5 shadow-[0_10px_36px_rgba(34,10,67,0.10)]"
              style={{ left: POS[i].x, top: POS[i].y }}
              data-testid={`module-pill-${m.id}`}
            >
              <p className="font-mono text-[10px] tracking-[0.18em] text-sg-primary-600">MODULE {m.id}</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-sg-text">{m.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-4 md:hidden">
          {modules.map((m) => (
            <Reveal key={m.id}>
              <div className="flex gap-4 rounded-xl border border-sg-primary/15 bg-white p-5" data-testid={`module-pill-mobile-${m.id}`}>
                <span className="font-mono text-xs tracking-[0.18em] text-sg-primary-600">{m.id}</span>
                <div>
                  <p className="font-semibold text-sg-text">{m.name}</p>
                  <p className="mt-1 text-sm text-sg-muted">{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-12 hidden max-w-4xl grid-cols-5 gap-4 md:grid">
          {modules.map((m) => (
            <p key={m.id} className="text-center text-xs leading-relaxed text-sg-muted">{m.desc}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
