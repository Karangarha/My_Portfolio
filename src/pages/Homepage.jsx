import "../index.css";
import AboutSections from "../sections/AboutSections";
import ContactSection from "../sections/ContactSection";
import MainSection from "../sections/MainSection";
import ProjectsSection from "../sections/ProjectsSection";
import NetBackground from "../backgrounds/NetBackground";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import SkillSection from "../sections/SkillSection";

const Homepage = () => {
  const onReload = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onReload();
  }, []);

  return (
    <>
      <NetBackground />
      <div className="snap-y snap-mandatory h-screen">
        <MainSection className="snap-start" />
        <AboutSections className="snap-center" />
        <SkillSection className="snap-center" />
        <ProjectsSection className="snap-start" />
        <ContactSection className="snap-start" />
      </div>
    </>
  );
};

export default Homepage;
