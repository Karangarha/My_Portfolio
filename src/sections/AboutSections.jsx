import ExpertiseCard from "../cards/ExpertiseCard";
import { motion } from "framer-motion";
import { MonitorCog, UserStar, Code } from "lucide-react";
import TitleAnimation from "../cards/TitleAnimation";

const ABOUT = ["A", "b", "o", "u", "t", "&nbsp;", "M", "e"];

const aboutText = [
  "I am a Computer Science student at Kean University with a passion for building software that solves real-world problems. Currently, I serve as a Supplemental Instruction Leader, where I mentor over 150 students in mastering Java, and Mathamatics.",
  "My engineering philosophy is centered on scalability and performance. Whether I'm architecting a Restaurant Management Platform with Supabase Realtime or revamping the Kean ACM website using React and Node.js, I focus on seamless user experiencee and don’t just write code; I build systems that are as intuitive as they are technically robust.",
];

const experiences = {
  1: {
    icon: Code,
    name: "Full-Stack Development",
    expertise:
      "I specialize in the MERN stack, architecting full-stack applications with real-time data sync and seamless user experiences.",
  },
  2: {
    icon: MonitorCog,
    name: "System Architecture",
    expertise:
      "Skilled in designing scalable RESTful APIs and implementing RBAC, with expertise in cloud deployments using automated CI/CD pipelines.",
  },
  3: {
    icon: UserStar,
    name: "Technical Leadership",
    expertise:
      "Driving technical growth as a Web Developer for Kean ACM and a SI Leader, improving academic performance while developing scalable platforms.",
  },
};

const AboutSections = () => {
  return (
    <section
      id="about"
      className="w-full min-h-screen py-20 flex items-center tracking-tighter"
    >
      <div className="container mx-auto px-6 md:px-20 flex flex-col gap-12">
        <TitleAnimation title={ABOUT} />

        <div className="w-full flex flex-col lg:flex-row gap-12 text-justify">
          {/* Left Side: Text Content */}
          <div className="flex flex-col gap-6 text-foreground lg:w-1/2">
            <h2 className="text-2xl font-bold text-foreground text-center">
              Passionate Software Engineer & Developer
            </h2>
            <div className="flex flex-col gap-4 text-md leading-relaxed opacity-90">
              {aboutText.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            <motion.button
              className="w-fit px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors mt-4"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px 0px var(--color-primary)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get In Touch
            </motion.button>
          </div>

          {/* Right Side: Expertise Cards */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            {Object.entries(experiences).map(([key, value]) => (
              <ExpertiseCard
                key={key}
                icon={value.icon}
                name={value.name}
                expertise={value.expertise}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSections;
