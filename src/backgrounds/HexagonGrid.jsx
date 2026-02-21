import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";

const HexagonGrid = () => {
  const containerRef = useRef(null);

  // 1. Track mouse position at the container level
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Smooth the movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  // Grid dimensions
  const rows = 20;
  const cols = 25;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-slate-950 overflow-hidden flex items-center justify-center perspective-[1000px]"
    >
      <div className="flex flex-col items-center">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-row"
            style={{
              // The "HoneyComb" offset: shift every other row
              marginLeft: rowIndex % 2 === 0 ? "0px" : "52px",
              marginTop: "-14px", // Pull rows together vertically
            }}
          >
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Hexagon
                key={`${rowIndex}-${colIndex}`}
                parentX={smoothX}
                parentY={smoothY}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Hexagon = ({ parentX, parentY }) => {
  const ref = useRef(null);

  // 3. Calculate rotation based on distance to the mouse
  // We use useTransform to map the distance between this hex and the mouse to a rotation value
  const rotateX = useTransform(parentY, (val) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const distanceY = (val - centerY) * 0.1; // Sensitivity factor
    return -distanceY;
  });

  const rotateY = useTransform(parentX, (val) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distanceX = (val - centerX) * 0.1; // Sensitivity factor
    return distanceX;
  });

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        clipPath:
          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      }}
      className="w-[100px] h-[100px] bg-slate-900 m-[2px] border border-slate-800 hover:bg-cyan-500/20 transition-colors duration-500 flex items-center justify-center"
    >
      {/* Subtle Inner Glow */}
      <div className="w-[95%] h-[95%] bg-slate-950 clip-hex opacity-80" />
    </motion.div>
  );
};

export default HexagonGrid;
