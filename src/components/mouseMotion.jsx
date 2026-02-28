import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const MouseMotion = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const opacity = useMotionValue(0); // Start hidden

  // Smooth out the opacity transition
  const smoothOpacity = useSpring(opacity, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const detectMobile = navigator.userAgentData.mobile;

    const mediaQuery = window.matchMedia("pointer: coarse");
    setIsMobile(mediaQuery.matches);
    if (mediaQuery.matches || detectMobile) {
      return;
    }

    let timer;

    const handleMouseMove = (e) => {
      // 1. Show cursor and update position
      opacity.set(1);
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);

      // 2. Clear existing timer and start a new one for inactivity
      clearTimeout(timer);
      timer = setTimeout(() => {
        opacity.set(0); // Hide after 2 seconds of no movement
      }, 2000);
    };

    const handleMouseLeave = () => {
      opacity.set(0); // Hide immediately when leaving window
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY, opacity]);

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        opacity: smoothOpacity,
      }}
      className="fixed top-0 left-0 w-5 h-5 bg-foreground/50 rounded-full pointer-events-none z-50 border-2 border-solid border-foreground/30"
    />
  );
};

export default MouseMotion;
