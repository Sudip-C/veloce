import { motion } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { SplitText } from "@/components/ui/SplitText";
import { EASE } from "@/lib/motion";

export default function About() {
  return (
    <PageTransition>
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <img
          src="/images/cover.webp"
          alt="Founder standing beside a classic Lamborghini Miura, lakeside mountain backdrop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />

        <div className="relative z-10 max-w-3xl px-6 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.premium, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-muted mb-4"
          >
            Est. 1963 · Sant'Agata Bolognese
          </motion.p>
          <SplitText
            as="h1"
            text="Six Decades Of Refusing To Compromise"
            className="font-display text-4xl md:text-6xl tracking-tight text-balance"
            stagger={0.05}
            delay={0.3}
          />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE.premium }}
          className="text-lg md:text-xl text-muted leading-relaxed text-balance"
        >
          Every car that carries our name starts the same way: a small team
          arguing about a shape that doesn't exist yet. From the first V12
          coupes to today's hybrid hypercars, the obsession hasn't changed —
          only the tools. This is a lineage built by people who believed a
          road car could feel like nothing else on the road.
        </motion.p>
      </section>
    </PageTransition>
  );
}
