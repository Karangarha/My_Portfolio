import React, { useState, useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

const NetBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const { theme } = useTheme();

  // Helper to convert rgb/hex string to number for Vanta
  const colorToHex = (color) => {
    if (color.startsWith("rgb")) {
      const rgb = color.match(/\d+/g);
      return (
        (parseInt(rgb[0]) << 16) | (parseInt(rgb[1]) << 8) | parseInt(rgb[2])
      );
    }
    if (color.startsWith("#")) {
      return parseInt(color.replace("#", ""), 16);
    }
    return 0x2563eb;
  };

  useEffect(() => {
    let effect = vantaEffect;

    const initVanta = () => {
      const getVar = (name) =>
        getComputedStyle(document.documentElement)
          .getPropertyValue(name)
          .trim();

      const rawPrimary = getVar("--primary");
      const rawBackground = getVar("--background");

      // Hardcoded fallbacks in case CSS variables aren't resolving
      const fallbacks = {
        dark: { primary: 0x6d28d9, background: 0x0f172a },
        light: { primary: 0x2563eb, background: 0xf5f3ff },
      };

      const colors = {
        primary: rawPrimary ? colorToHex(rawPrimary) : fallbacks[theme].primary,
        background: rawBackground
          ? colorToHex(rawBackground)
          : fallbacks[theme].background,
      };

      if (effect) effect.destroy();

      effect = NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 0.9,
        color: colors.primary,
        backgroundColor: colors.background,
        points: 20.0,
        maxDistance: 0,
        spacing: 20.0,
      });

      // Vanta uses MeshLambertMaterial for dots, which reacts to scene lights
      // and gets washed out to white. Swap to MeshBasicMaterial which renders
      // the exact color regardless of lighting.
      if (effect.points) {
        const primaryColor = new THREE.Color(colors.primary);
        effect.points.forEach((p) => {
          if (p.material) {
            p.material.dispose();
            p.material = new THREE.MeshBasicMaterial({ color: primaryColor });
          }
        });
      }

      // Fix for newer Three.js: THREE.VertexColors constant was removed.
      // Vanta sets vertexColors: THREE.VertexColors (undefined), so lines
      // fall back to the default white color. We patch it to `true`.
      if (effect.linesMesh && effect.linesMesh.material) {
        effect.linesMesh.material.vertexColors = true;
        effect.linesMesh.material.needsUpdate = true;
      }

      setVantaEffect(effect);
    };

    // Small timeout to ensure ThemeContext has applied the class to documentElement
    const timer = setTimeout(initVanta, 50);

    return () => {
      clearTimeout(timer);
      if (effect) effect.destroy();
    };
  }, [theme]); // Re-run on theme change

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
      }}
    />
  );
};

export default NetBackground;
