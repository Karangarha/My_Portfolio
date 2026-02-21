import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const MouseMotion = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
      }}
      className="fixed top-0 left-0 w-5 h-5 bg-foreground/50 rounded-full pointer-events-none z-50 border-2 border-solid border-foreground/30 "
    />
  );
};

export default MouseMotion;
