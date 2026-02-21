import { projects } from "../constants/projects";
import TitleAnimation from "../cards/TitleAnimation";
import ProjectCard from "../cards/ProjectCard";

const PROJECTS = [
  "F",
  "e",
  "a",
  "t",
  "u",
  "r",
  "e",
  "d",
  "&nbsp;",
  "P",
  "r",
  "o",
  "j",
  "e",
  "c",
  "t",
  "s",
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="w-full min-h-screen">
      <div className="container mx-auto px-6 md:px-20 flex flex-col gap-12 py-20">
        <TitleAnimation title={PROJECTS} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
