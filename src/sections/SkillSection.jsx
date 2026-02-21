import { skills } from "../constants/Skill";
import { motion } from "framer-motion";
import TitleAnimation from "../cards/TitleAnimation";

const SKILLS = ["M", "y", "&nbsp;", "S", "k", "i", "l", "l", "s"];

const SkillSection = () => {
  return (
    <section
      id="skills"
      className="w-full min-h-screen py-20  tracking-tighter"
    >
      <div className="container mx-auto px-6 md:px-20 flex flex-col gap-12 items-center align-center justify-center">
        <TitleAnimation title={SKILLS} />
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(skills).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col gap-2 bg-primary/20 p-2 rounded-lg"
            >
              <h2 className="text-2xl font-bold text-primary text-center">
                {key}
              </h2>
              <div className="flex flex-wrap gap-2">
                {value.map((item) => (
                  <motion.div
                    key={item.name}
                    className="bg-background p-2 rounded-full flex items-center gap-2"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 10px var(--color-primary)",
                      y: -5,
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    {typeof item.icon === "string" ? (
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-6 h-6"
                      />
                    ) : (
                      <item.icon
                        size={36}
                        className="bg-primary/10 text-primary rounded-full p-2"
                      />
                    )}
                    <span className="text-foreground text-sm">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
