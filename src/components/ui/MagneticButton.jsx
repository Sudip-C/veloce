import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A button that subtly "pulls" toward the cursor while hovered,
 * then springs back to center on mouse leave. Strength controls
 * how much of the cursor offset gets applied (0.3–0.5 feels natural;
 * 1.0 makes the button track the cursor exactly, which feels broken).
 */
export function MagneticButton({
  children,
  onClick,
  href,
  className,
  variant = "solid", // "solid" | "ghost"
  strength = 0.35,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 });

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Component = href ? motion.a : motion.button;
  const linkProps = href ? { href } : {};

  return (
    <Component
      ref={ref}
      {...linkProps}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-wide transition-colors duration-300",
        variant === "solid" &&
          "bg-accent text-accent-foreground hover:bg-accent/90",
        variant === "ghost" &&
          "border border-border text-foreground hover:border-foreground",
        className
      )}
    >
      {children}
    </Component>
  );
}
