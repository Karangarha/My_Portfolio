import { motion } from "framer-motion";
import { Code, MonitorCog, UserStar } from "lucide-react";

const ExpertiseCard = ({ icon: Icon, name, expertise }) => {
  return (
    <motion.div
      className="bg-background p-4 flex flex-rows gap-2 rounded-xl"
      whileHover={{
        scale: 1.05,
        boxShadow: "1px 1px 20px 0px var(--color-primary)",
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="my-auto">
        <Icon
          size={42}
          className="text-primary bg-primary/10 rounded-full p-2"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-primary">{name}</h2>
        <p className="text-foreground text-[15px] text-justify">{expertise}</p>
      </div>
    </motion.div>
  );
};

export default ExpertiseCard;
