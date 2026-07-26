import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement these — Framer Motion and GSAP/ScrollTrigger
// reach for them even in components that don't obviously use them.
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = window.ResizeObserver || MockResizeObserver;

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver =
  window.IntersectionObserver || MockIntersectionObserver;

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Lenis calls scrollTo on window and/or document.documentElement during
// its raf loop; jsdom's default throws "not implemented" console noise.
window.scrollTo = () => {};
document.documentElement.scrollTo = () => {};
window.HTMLElement.prototype.scrollTo = () => {};
