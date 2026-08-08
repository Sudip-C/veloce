import { lazy, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Image as ImageIcon, Box } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { ViewerSkeleton } from "@/components/ui/ViewerSkeleton";
import { ThreeErrorBoundary } from "@/components/three/ThreeErrorBoundary";
import { ModelCredit } from "@/components/ui/ModelCredit";
import { MODELS, COLORS, WHEELS, INTERIORS } from "@/data/models";
import { formatCurrency, cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const CarViewer = lazy(() =>
  import("@/components/three/CarViewer").then((m) => ({ default: m.CarViewer }))
);

export default function Configurator() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedSlug = searchParams.get("model");
  const initialModel =
    MODELS.find((m) => m.slug === requestedSlug) ?? MODELS[0];

  const [model, setModel] = useState(initialModel);
  const [color, setColor] = useState(COLORS[0]);
  const [wheel, setWheel] = useState(WHEELS[0]);
  const [interior, setInterior] = useState(INTERIORS[0]);
  // "photo" shows the real car — the accurate, correct-by-default view.
  // "3d" is an opt-in preview for experimenting with finishes; the
  // procedural model is stylized, not a stand-in for the actual car.
  const [viewMode, setViewMode] = useState("photo");

  // Keep the URL in sync so a configuration is shareable/bookmarkable,
  // and so arriving here from a Models card (?model=slug) selects correctly.
  useEffect(() => {
    setSearchParams({ model: model.slug }, { replace: true });
  }, [model, setSearchParams]);

  const total = model.basePrice + color.price + wheel.price + interior.price;

  return (
    <PageTransition className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl tracking-tight">
          Build Yours
        </h1>

        {/* Model switcher — real product photos as tabs */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {MODELS.map((m) => (
            <button
              key={m.slug}
              onClick={() => setModel(m)}
              aria-pressed={model.slug === m.slug}
              className={cn(
                "flex-shrink-0 rounded-xl border overflow-hidden transition-colors w-40",
                model.slug === m.slug ? "border-accent" : "border-border"
              )}
            >
              <img
                src={m.image}
                alt={m.name}
                className="h-20 w-full object-cover"
              />
              <p className="text-xs py-2 uppercase tracking-wide">{m.name}</p>
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {/* Photo / 3D toggle */}
            <div className="flex items-center gap-2 mb-3">
              <ViewToggleButton
                active={viewMode === "photo"}
                onClick={() => setViewMode("photo")}
                icon={<ImageIcon className="h-3.5 w-3.5" />}
                label="Photo"
              />
              <ViewToggleButton
                active={viewMode === "3d"}
                onClick={() => setViewMode("3d")}
                icon={<Box className="h-3.5 w-3.5" />}
                label="3D Preview"
              />
            </div>

            <div className="aspect-square lg:aspect-auto lg:h-[560px] rounded-2xl border border-border bg-surface overflow-hidden">
              {viewMode === "photo" ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={model.slug}
                    src={model.image}
                    alt={model.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE.premium }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
              ) : (
                <>
                  <ThreeErrorBoundary>
                    <Suspense fallback={<ViewerSkeleton />}>
                      <CarViewer color={color.hex} />
                    </Suspense>
                  </ThreeErrorBoundary>
                  <p className="sr-only">
                    Generic 3D demo car for experimenting with finishes —
                    not a model of the {model.name} itself.
                  </p>
                </>
              )}
            </div>
            {viewMode === "3d" && (
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Demo car for trying finishes — not a model of the{" "}
                  {model.name} itself.
                </p>
                <ModelCredit className="flex-shrink-0" />
              </div>
            )}
          </div>

          {/* Configuration panel */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent">
                {model.category}
              </p>
              <h2 className="font-display text-3xl tracking-tight mt-1">
                {model.name}
              </h2>
              <p className="text-sm text-muted mt-2">{model.tagline}</p>
            </div>

            <OptionGroup
              label="Exterior Finish"
              options={COLORS}
              selected={color}
              onSelect={setColor}
              renderSwatch={(opt) => (
                <span
                  className="h-6 w-6 rounded-full border border-border/60"
                  style={{ backgroundColor: opt.hex }}
                />
              )}
            />

            <OptionGroup label="Wheels" options={WHEELS} selected={wheel} onSelect={setWheel} />

            <OptionGroup
              label="Interior"
              options={INTERIORS}
              selected={interior}
              onSelect={setInterior}
            />

            <div className="border-t border-border pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted">
                  Estimated price{model.priceIsEstimate ? " (est.)" : ""}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25, ease: EASE.snap }}
                    className="font-display text-2xl tracking-tight"
                  >
                    {formatCurrency(total)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <button className="mt-4 w-full rounded-full bg-accent text-accent-foreground py-3.5 text-sm font-medium uppercase tracking-wide hover:bg-accent/90 transition-colors">
                Reserve This Build
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function ViewToggleButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs uppercase tracking-wide transition-colors border",
        active
          ? "border-accent bg-surface-elevated text-foreground"
          : "border-border text-muted hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function OptionGroup({ label, options, selected, onSelect, renderSwatch }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
        {label}
      </p>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const isSelected = selected.name === opt.name;
          return (
            <button
              key={opt.name ?? opt.id}
              onClick={() => onSelect(opt)}
              aria-pressed={isSelected}
              className={cn(
                "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                isSelected
                  ? "border-accent bg-surface-elevated"
                  : "border-border hover:border-muted"
              )}
            >
              <span className="flex items-center gap-3">
                {renderSwatch?.(opt)}
                <span className="text-sm">{opt.name}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="text-xs text-muted">
                  {opt.price > 0 ? `+${formatCurrency(opt.price)}` : "Included"}
                </span>
                {isSelected && <Check className="h-4 w-4 text-accent" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
