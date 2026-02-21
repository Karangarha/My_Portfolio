import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ProjectCard = ({ key, project }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      key={key}
      className="bg-card rounded-xl border border-primary/10 overflow-hidden flex flex-col"
      whileHover={{
        y: -10,
        borderColor: "var(--color-primary)",
        boxShadow: "0px 10px 30px -15px var(--color-primary)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Content Container - flex-grow ensures all cards in a row are same height */}
      <div className="p-6 flex flex-col flex-grow gap-4">
        <h2 className="text-xl font-bold text-primary tracking-tighter">
          {project.name}
        </h2>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
              whileHover={{
                scale: 1.1,
                y: -5,
                backgroundColor: "var(--color-primary)",
                color: "var(--color-background)",
              }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <p className="text-md text-foreground/80 leading-relaxed flex-grow">
          {project.description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-primary/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000"
              alt="github"
              className={`w-7 h-7 ${theme === "dark" ? "filter dark:invert" : ""}`}
            />
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:scale-110 transition-transform"
          >
            <Radio className="w-7 h-7" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
