import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useTime,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

const MainSection = () => {
  const nameRef = useRef(null);
  const nameRef2 = useRef(null);
  const [position, setPosition] = useState("fixed");
  const { scrollY } = useScroll();
  const time = useTime();
  const [left, setLeft] = useState(0);

  const [nameLock, setNameLock] = useState(false);

  const moveHi = useTransform(time, [2000, 2200], [20, 50]);
  const value = useTransform(moveHi, (v) => `${1000 / v}vw`);

  const opacity = useTransform(scrollY, [300, 450], [1, 0]);
  const opacity1 = useTransform(scrollY, [300, 450], [1, 0]);

  const nameTranslateX = useTransform(scrollY, [500, 650], [205, 105 - left]);
  const nameScale = useTransform(scrollY, [600, 650], [1, 0.4]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosition("");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const isLocked = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (nameRef.current) {
      const rect = nameRef.current.getBoundingClientRect();
      const distance = rect.top;

      if (nameRef2.current) {
        const rect2 = nameRef2.current.getBoundingClientRect();
      }

      if (distance <= 0 && !isLocked.current) {
        setLeft(rect.left);
        setNameLock(true);
        isLocked.current = true;
      } else if (distance > 0 && isLocked.current) {
        setNameLock(false);
        isLocked.current = false;
      }
    }
  });

  const nameSetting = {
    initial: { x: 1500 },
    animate: { x: 0 },
    transition: {
      duration: 1,
      type: "spring",
      damping: 14,
      delay: 1.9,
    },
  };

  const nameTranslateXPx = useTransform(nameTranslateX, (v) => `${v}px`);

  return (
    <section id="home" className="w-full h-screen flex ">
      <motion.div className=" w-full flex flex-col items-center justify-center">
        <div className="sticky top-1/4 py-50 md:py-20">
          <motion.div className="lg:text-6xl md:text-5xl text-4xl font-bold flex">
            <motion.div
              className={`text-foreground ${position}`}
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                stiffness: 1000,
                damping: 3,
                duration: 5,
                delay: 2.2,
              }}
              style={{
                opacity: opacity,
                left: value,
              }}
            >
              Hi,&nbsp;
            </motion.div>
            <motion.div
              className={`text-primary`}
              {...nameSetting}
              style={{ opacity: opacity }}
            >
              I'm&nbsp;
            </motion.div>
            <motion.div
              ref={nameRef}
              {...nameSetting}
              className={`text-primary sticky ${nameLock ? "invisible" : ""}`}
            >
              Karanpreet Singh
            </motion.div>
            {nameLock && (
              <motion.div
                ref={nameRef2}
                transition={{ duration: 0 }}
                className={`text-primary fixed top-0 z-1`}
                style={{
                  x: nameTranslateXPx,
                  scale: nameScale,
                }}
              >
                Karanpreet Singh
              </motion.div>
            )}
          </motion.div>
          <motion.p
            className={`text-foreground text-md md:text-lg lg:text-xl max-w-2xl py-5 text-center`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 10,
              duration: 3,
              delay: 3.5,
            }}
            style={{ opacity: opacity1 }}
          >
            Full Stack Developer with a strong background in web development,
            always eager to take on new challenges.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 10,
              duration: 3,
              delay: 3.5,
            }}
            style={{ opacity: opacity1 }}
          >
            <motion.button
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default MainSection;
