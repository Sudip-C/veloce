/**
 * Central animation tokens shared across Framer Motion + GSAP.
 * Keep these in sync with the --ease-* CSS vars in index.css.
 */

export const EASE = {
  premium: [0.16, 1, 0.3, 1],
  snap: [0.65, 0, 0.35, 1],
};

// GSAP wants string/array eases in this format
export const GSAP_EASE = {
  premium: "cubic-bezier(0.16, 1, 0.3, 1)",
  snap: "cubic-bezier(0.65, 0, 0.35, 1)",
};

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.4,
};

// Reusable Framer Motion variants
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.premium },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE.premium },
  },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE.premium },
  },
};
