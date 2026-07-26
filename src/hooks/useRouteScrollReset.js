import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/lib/LenisProvider";

/**
 * On every route change: snap scroll back to top and tell ScrollTrigger
 * to recalculate trigger positions against the new page's DOM.
 * Mount this once, high in the tree (inside the router, inside Lenis).
 */
export function useRouteScrollReset() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });

    // Wait a tick so new route's DOM (and any ScrollTrigger.create calls
    // in its effects) has mounted before recalculating.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);
}
