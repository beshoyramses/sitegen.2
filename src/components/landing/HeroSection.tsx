"use client";

import { motion } from "framer-motion";
import { RocketIcon, MagicWandIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedItem } from "./AnimatedSection";
import { AnimatedText } from "./AnimatedText";
import AIPreview from "./AIPreview";

export default function HeroSection() {
  const MotionButton = motion(Button);
  const MotionDiv = motion.div;

  return (
    <section className="py-24 px-4 text-center relative">
      {/* Animated Background Elements */}
      <MotionDiv
        className="absolute top-20 left-[10%] w-16 h-16 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <MotionDiv
        className="absolute top-40 right-[15%] w-24 h-24 rounded-full bg-secondary/10 blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        <AnimatedItem>
          <MotionDiv
            className="inline-flex items-center border rounded-full px-4 py-1 mb-4 bg-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <RocketIcon className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium">
              Introducing AI Site Builder 2.0
            </span>
          </MotionDiv>
        </AnimatedItem>

        <AnimatedText delay={0.3}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Transform Ideas Into <span className="text-primary">Live Sites</span> Instantly
          </h1>
        </AnimatedText>

        <AnimatedText delay={0.4}>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            AI-powered website builder that creates stunning, responsive
            websites from a simple description. No design skills required.
          </p>
        </AnimatedText>

        <MotionDiv
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MotionButton
            size="lg"
            className="shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href={"/sign-in"}>Get Started Free</Link>
          </MotionButton>
          <MotionButton
            size="lg"
            variant="outline"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <MagicWandIcon className="mr-2" />
            AI Preview
          </MotionButton>
        </MotionDiv>

        <MotionDiv
          className="bg-background border rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            y: -10,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <AnimatedItem delay={0.6}>
            <AIPreview />
          </AnimatedItem>
        </MotionDiv>
      </div>  
    </section>
  );
}