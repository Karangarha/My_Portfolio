import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

const HexagonCard = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 50, stiffness: 100 });
  const mouseYSpring = useSpring(y, { damping: 50, stiffness: 100 });

  // Physical Push Effect:
  const rotateX = useTransform(
    mouseYSpring,
    [0.01, -0.01],
    ["-30deg", "30deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [0.01, -0.01],
    ["30deg", "-30deg"],
  );

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized position from -0.5 to 0.5
    const normalizedX = (e.clientX - rect.left) / width - 0.04;
    const normalizedY = (e.clientY - rect.top) / height - 0.04;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        // Using w-[120px] (Tailwind scale 30)
        className="hexagon w-[80px] h-[80px] bg-gray-900  cursor-pointer"
      />
    </div>
  );
};

const Background = () => {
  // Increased grid size for smaller hexagons
  // 120px width -> approx 16 cols for 1920px width without stagger. With stagger/overlap, need more.
  // 120px height -> 90px effective height. 1080/90 = 12 rows.
  // Using 24x24 to be safe and cover larger screens.
  const rows = Array.from({ length: 24 });
  const cols = Array.from({ length: 24 });

  return (
    <div className="w-full h-screen bg-[#ff00ff] backdrop-blur-sm shadow-cyan-500 overflow-hidden flex flex-col items-center justify-center">
      <div className="flex flex-col -mt-[30px] gap-[2px]">
        {" "}
        {/* Container for the grid - top negative margin to pull up */}
        {rows.map((_, rowIndex) => (
          <div
            key={rowIndex}
            // -mt-[30px] creates the vertical overlap (25% of 120px)
            // -ml-[60px] creates the horizontal stagger (50% of 120px)
            className={`flex flex-row -mt-[20px] gap-[2px] ${rowIndex % 2 === 0 ? "-ml-[40px]" : ""}`}
          >
            {cols.map((_, colIndex) => (
              <HexagonCard key={`${rowIndex}-${colIndex}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Background;
