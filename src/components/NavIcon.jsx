"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import {
  Home,
  User,
  Folder,
  Mail,
  Lightbulb,
  Menu,
  Briefcase,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

const NavIcon = () => {
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleScroll = (id) => {
    console.log(id);

    if (id === "theme") {
      setExpanded(false);
      toggleTheme();

      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setExpanded(false);
  };

  const menu = [
    { name: "Home", id: "home", icon: <Home /> },
    { name: "About", id: "about", icon: <User /> },
    { name: "Skills", id: "skills", icon: <Briefcase /> },
    { name: "Projects", id: "projects", icon: <Folder /> },
    { name: "Contact", id: "contact", icon: <Mail /> },
    {
      name: theme === "dark" ? "Light" : "Dark",
      id: "theme",
      icon: <Lightbulb />,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {expanded && (
        <div
          className="absolute inset-0 pointer-events-auto bg-transparent"
          onPointerDown={() => setExpanded(false)}
        />
      )}
      <div
        ref={containerRef}
        className="absolute inset-[10px] pointer-events-none"
      />

      <div className="w-full h-full flex items-start justify-end p-[10px]">
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={true}
          layout
          whileDrag={{ scale: 1.1 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setTimeout(() => setIsDragging(false), 50);
          }}
          onTap={(e, info) => {
            const hasMotion =
              Math.abs(info.offset?.x || 0) > 10 ||
              Math.abs(info.offset?.y || 0) > 10;

            if (!isDragging && !hasMotion) {
              // If we clicked a button (or inside one), don't toggle expands
              if (e.target.closest("button")) return;
              toggleExpand();
            }
          }}
          animate={
            expanded ? { width: 300, height: 100 } : { width: 60, height: 60 }
          }
          className="pointer-events-auto nav-icon rounded-2xl flex items-center justify-center overflow-hidden inset-shadow-sm inset-shadow-black/30"
          transition={{ type: "spring", stiffness: 300, damping: 50 }}
        >
          <motion.div
            layout
            className="font-medium flex items-center justify-center gap-2"
          >
            {expanded ? (
              menu.map((item) => (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="font-medium flex flex-col items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleScroll(item.id);
                  }}
                >
                  <span className="innerIcon p-2 rounded-xl text-white inset-shadow-sm inset-shadow-black/30">
                    {item.icon}
                  </span>
                  <span className="text-xs font-normal">{item.name}</span>
                </motion.button>
              ))
            ) : (
              <Menu className="nav" />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NavIcon;
