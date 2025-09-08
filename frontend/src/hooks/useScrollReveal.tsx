import { useEffect, useRef } from "react";
import { useAnimation, useInView } from "framer-motion";
import { useLocation } from "react-router-dom";

// ✅ New hook to control animations reliably
export function useScrollReveal(options = { amount: 0.25, once: false }) {
  const ref = useRef<HTMLElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: options.amount });

  const location = useLocation();

  useEffect(() => {
    // reset animations on route change
    controls.set("hidden");
  }, [location.pathname, controls]);

  useEffect(() => {
    if (inView) controls.start("show");
    else if (!options.once) controls.start("hidden");
  }, [inView, controls, options.once]);

  return { ref, controls };
}