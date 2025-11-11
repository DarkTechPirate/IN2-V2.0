import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

const ScrollAnimation = ({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 50,
}: ScrollAnimationProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger once
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
