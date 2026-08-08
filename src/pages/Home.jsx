import { PageTransition } from "@/components/layout/PageTransition";
import { Hero } from "@/components/sections/Hero";
import { CarShowcase } from "@/components/sections/CarShowcase";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <CarShowcase />
    </PageTransition>
  );
}
