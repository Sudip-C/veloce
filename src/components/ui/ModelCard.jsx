import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";

export function ModelCard({ model, index }) {
  const navigate = useNavigate();

  return (
    <motion.article
      variants={fadeUp}
      className="group relative rounded-2xl border border-border bg-surface overflow-hidden cursor-pointer"
      onClick={() => navigate(`/configurator?model=${model.slug}`)}
      whileHover="hover"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-elevated">
        <motion.img
          src={model.image}
          alt={model.name}
          loading={index < 2 ? "eager" : "lazy"}
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">
              {model.category}
            </p>
            <h3 className="font-display text-2xl md:text-3xl tracking-tight mt-1">
              {model.name}
            </h3>
          </div>
          <motion.div
            variants={{ hover: { rotate: 45, scale: 1.1 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 h-10 w-10 rounded-full border border-border flex items-center justify-center"
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </div>

        <p className="mt-3 text-sm text-muted leading-relaxed">
          {model.tagline}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
          <Spec label="Power" value={model.specs.power} />
          <Spec label="0–60" value={model.specs.zeroToSixty} />
          <Spec label="Top Speed" value={model.specs.topSpeed} />
        </div>
      </div>
    </motion.article>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium mt-0.5">{value}</p>
    </div>
  );
}
