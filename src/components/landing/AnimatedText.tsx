"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: delay * 0.1, 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    }
  })
};

export function AnimatedText({ children, className, delay = 0 }: AnimatedTextProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
      variants={textVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}