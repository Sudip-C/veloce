import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function ViewerSkeleton() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: EASE.premium }}
        className="text-sm text-muted uppercase tracking-widest"
      >
        Loading viewer…
      </motion.div>
    </div>
  );
}
