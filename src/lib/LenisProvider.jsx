import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

/**
 * Wraps the app in a single Lenis instance and keeps GSAP's ScrollTrigger
 * in lockstep with it. Without this sync, ScrollTrigger listens to the
 * native scroll event while Lenis intercepts scrolling virtually, so
 * scroll-triggered animations fire at the wrong position or stutter.
 */
export function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Drive GSAP's ticker with Lenis's raf instead of running two rAF loops
    function raf(time) {
      instance.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger to recalc positions on every Lenis scroll frame
    instance.on("scroll", ScrollTrigger.update);

    // Let ScrollTrigger drive the scroll position when it needs to
    // (e.g. .scrollTo() calls, pinning) by proxying through Lenis.
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

/** Access the raw Lenis instance, e.g. for lenis.scrollTo('#section'). */
export function useLenis() {
  return useContext(LenisContext);
}
