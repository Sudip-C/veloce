import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { ModelCard } from "@/components/ui/ModelCard";
import { SplitText } from "@/components/ui/SplitText";
import { MODELS } from "@/data/models";
import { staggerContainer } from "@/lib/motion";

export default function Models() {
  return (
    <PageTransition className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-6xl mx-auto">
        <SplitText
          as="h1"
          text="The Lineup"
          className="font-display text-5xl md:text-7xl tracking-tight"
          stagger={0.06}
        />
        <p className="mt-4 max-w-lg text-muted">
          Four distinct machines, one obsession with the edge of what's
          possible. Select a model to start configuring.
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.15)}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {MODELS.map((model, i) => (
            <ModelCard key={model.slug} model={model} index={i} />
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
