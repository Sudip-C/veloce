import { PageTransition } from "@/components/layout/PageTransition";

export default function About() {
  return (
    <PageTransition className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-5xl md:text-7xl tracking-tight uppercase">
        About
      </h1>
    </PageTransition>
  );
}
