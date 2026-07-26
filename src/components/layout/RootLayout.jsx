import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { useRouteScrollReset } from "@/hooks/useRouteScrollReset";

export function RootLayout() {
  const location = useLocation();
  useRouteScrollReset();

  return (
    <>
      <Navbar />
      {/* mode="wait" so the leaving page fully exits before the next enters —
          prevents two full-height pages overlapping mid-transition */}
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <Outlet />
        </div>
      </AnimatePresence>
    </>
  );
}
