import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollCue() {
  const { scrollY } = useScroll();
  // Fully faded by 300px of scroll — feels natural for a full-height hero
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="h-9 w-[1px] bg-gradient-to-b from-muted to-transparent"
      />
    </motion.div>
  );
}
