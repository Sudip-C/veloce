import { lazy, Suspense, useState } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { ViewerSkeleton } from "@/components/ui/ViewerSkeleton";
import { ThreeErrorBoundary } from "@/components/three/ThreeErrorBoundary";
import { ModelCredit } from "@/components/ui/ModelCredit";
import { COLORS } from "@/data/models";
import { cn } from "@/lib/utils";

// Code-split: Three.js + R3F + drei only load once this section is reached,
// keeping them out of the initial route bundle.
const CarViewer = lazy(() =>
  import("@/components/three/CarViewer").then((m) => ({ default: m.CarViewer }))
);

export function CarShowcase() {
  const [color, setColor] = useState(COLORS[0].hex);

  return (
    <section className="relative min-h-screen py-24 px-6 flex flex-col items-center">
      <SplitText
        as="h2"
        text="See It From Every Angle"
        className="font-display text-center text-4xl md:text-6xl tracking-tight text-balance"
        stagger={0.05}
      />
      <p className="mt-4 text-muted text-center max-w-md">
        Drag to rotate, scroll to zoom, and pick a finish.
      </p>

      <div className="mt-12 w-full max-w-4xl aspect-square md:aspect-[16/10] rounded-2xl border border-border bg-surface overflow-hidden">
        <ThreeErrorBoundary>
          <Suspense fallback={<ViewerSkeleton />}>
            <CarViewer color={color} />
          </Suspense>
        </ThreeErrorBoundary>
      </div>
      <ModelCredit className="mt-2 self-end max-w-4xl w-full text-right" />

      <div className="mt-8 flex items-center gap-3">
        {COLORS.map((c) => (
          <button
            key={c.hex}
            onClick={() => setColor(c.hex)}
            aria-label={c.name}
            aria-pressed={color === c.hex}
            className={cn(
              "h-9 w-9 rounded-full border-2 transition-transform duration-300 hover:scale-110",
              color === c.hex ? "border-foreground scale-110" : "border-border"
            )}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </section>
  );
}
