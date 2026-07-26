import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sliders } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { EASE } from "@/lib/motion";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient background glow — placeholder for the 3D car scene (Phase 4) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE.premium, delay: 0.2 }}
        className="mb-6 text-xs uppercase tracking-[0.3em] text-muted"
      >
        Precision Engineered · 2026 Lineup
      </motion.p>

      <SplitText
        as="h1"
        text="Built To Disappear At Speed"
        className="font-display text-center text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight leading-[0.95] text-balance"
        delay={0.3}
        stagger={0.08}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE.premium, delay: 1.1 }}
        className="mt-8 max-w-lg text-center text-muted text-balance"
      >
        A lineup shaped by wind, tuned by data, and finished by hand.
        Explore every model or build one that's entirely yours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE.premium, delay: 1.3 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton variant="solid" onClick={() => navigate("/models")}>
          Explore Models
          <ArrowRight className="h-4 w-4" />
        </MagneticButton>
        <MagneticButton variant="ghost" onClick={() => navigate("/configurator")}>
          Configure Yours
          <Sliders className="h-4 w-4" />
        </MagneticButton>
      </motion.div>

      <ScrollCue />
    </section>
  );
}
