"use client";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

const FadeUp = ({ children, className, ...props }: { children: ReactNode, className?: string }) => {
  const body = useRef(null);
  const isInView = useInView(body, { once: true, margin: "-20%" });
  const animation = {
    initial: { opacity: 0},
    enter: () => ({
      // y: "0",
      opacity: 1,
      transition: { ease: "easeOut", duration: 1 },
      // transition: {
      //   duration: 0.75,
      //   ease: [0.33, 1, 0.68, 1],
      //   delay: 0.075 * i,
      // },
    }),
  };
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate={isInView ? "enter" : ""}
      ref={body}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;
