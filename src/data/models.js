// Base MSRPs are approximate figures from public sources (KBB, iSeeCars,
// Car and Driver) as of mid-2026 — real pricing varies by region, dealer,
// and specific trim. The Urus SE Performante is new enough that no
// confirmed official base price exists yet; $300,000 is a press estimate.
export const MODELS = [
  {
    slug: "revuelto",
    name: "Revuelto",
    category: "V12 Hybrid Flagship",
    tagline: "The new benchmark. 1,001 horsepower, three electric motors, one naturally aspirated V12.",
    image: "/images/models/revuelto.webp",
    specs: { power: "1,001 hp", zeroToSixty: "2.5s", topSpeed: "217 mph" },
    basePrice: 608358,
  },
  {
    slug: "temerario",
    name: "Temerario",
    category: "Twin-Turbo V8 Hybrid",
    tagline: "A new V8 heart, twin-turbocharged and hybrid-assisted, redlining at 10,000 rpm.",
    image: "/images/models/temerario.webp",
    specs: { power: "907 hp", zeroToSixty: "2.7s", topSpeed: "213 mph" },
    basePrice: 390000,
  },
  {
    slug: "urus-se",
    name: "Urus SE",
    category: "Plug-In Hybrid Super SUV",
    tagline: "The world's first plug-in hybrid super SUV — over 30 miles of pure electric range.",
    image: "/images/models/urus-se.webp",
    specs: { power: "789 hp", zeroToSixty: "3.4s", topSpeed: "194 mph" },
    basePrice: 252007,
  },
  {
    slug: "urus-se-performante",
    name: "Urus SE Performante",
    category: "Track-Focused Super SUV",
    tagline: "Lighter, sharper, faster. The most track-capable Urus ever built.",
    image: "/images/models/urus-se-performante.webp",
    specs: { power: "800 hp", zeroToSixty: "3.3s", topSpeed: "194 mph" },
    basePrice: 300000,
    priceIsEstimate: true,
  },
];

export const COLORS = [
  { name: "Volt Lime", hex: "#d4ff3f", price: 0 },
  { name: "Obsidian", hex: "#1a1a1d", price: 0 },
  { name: "Racing Red", hex: "#e0332f", price: 4200 },
  { name: "Glacier White", hex: "#f2f2f0", price: 0 },
  { name: "Deep Ocean", hex: "#1e4d6b", price: 6800 },
];

export const WHEELS = [
  { id: "standard", name: "Standard Forged", price: 0 },
  { id: "diamond", name: "Diamond-Cut Sport", price: 5400 },
  { id: "carbon", name: "Carbon Fiber", price: 12900 },
];

export const INTERIORS = [
  { id: "alcantara", name: "Black Alcantara", price: 0 },
  { id: "leather", name: "Full Leather", price: 3800 },
  { id: "carbon-trim", name: "Carbon & Leather", price: 8500 },
];
