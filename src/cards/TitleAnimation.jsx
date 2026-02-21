import { motion } from "framer-motion";

const TitleAnimation = ({ title }) => {
  return (
    <motion.div className="lg:text-5xl text-3xl font-bold text-primary text-center">
      {Object.values(title).map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          whileHover={{
            scale: 1.1,
            y: -5,
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {item === "&nbsp;" ? <span>&nbsp;</span> : item}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TitleAnimation;
