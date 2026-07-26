import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PageTransition } from "@/components/layout/PageTransition";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      {/* Tall spacer so we can prove smooth scroll + scroll-trigger still work
          underneath the new Hero. Real content sections replace this in Phase 5. */}
      <div className="h-[150vh] w-full flex items-start justify-center pt-32">
        <ScrollProofSection />
      </div>
    </PageTransition>
  );
}

function ScrollProofSection() {
  const boxRef = useRef(null);

  useEffect(() => {
    const el = boxRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8, rotate: -8 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
            // markers: true, // uncomment while debugging trigger positions
          },
        }
      );
    });

    return () => ctx.revert(); // cleans up the ScrollTrigger instance too
  }, []);

  return (
    <div
      ref={boxRef}
      className="h-64 w-64 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-muted"
    >
      scroll-triggered box
    </div>
  );
}
