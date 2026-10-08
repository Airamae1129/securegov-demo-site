import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("sg-consent")) setShow(true);
    const reset = () => setShow(true);
    window.addEventListener("sg-cookie-reset", reset);
    return () => window.removeEventListener("sg-cookie-reset", reset);
  }, []);

  const answer = (v: string) => {
    localStorage.setItem("sg-consent", v);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="cookie-banner"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[85] mx-auto max-w-xl rounded-2xl border border-sg-violet-400/25 bg-sg-ink-950/95 p-5 shadow-2xl backdrop-blur-xl sm:left-6 sm:right-auto"
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="text-sm font-semibold text-white">Cookies, the GDPR way</p>
          <p className="mt-1.5 text-xs leading-relaxed text-sg-violet-300/80">
            This demo uses no tracking cookies. Analytics are privacy-friendly and off until you say yes.
          </p>
          <div className="mt-4 flex gap-3">
            <button data-testid="cookie-accept" onClick={() => answer("accepted")}
              className="rounded-lg bg-sg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sg-primary-600">
              Accept
            </button>
            <button data-testid="cookie-decline" onClick={() => answer("declined")}
              className="rounded-lg border border-sg-violet-400/40 px-4 py-2 text-xs font-semibold text-sg-violet-300 transition-colors hover:border-sg-violet-400 hover:text-white">
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
