"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import { AnimatedItem } from "./AnimatedSection";
export default function HowItWorksSection() {
  
  const steps = [
    {
      title: "Describe Your Needs",
      description: "Tell us what kind of website you want in plain English",
    },
    {
      title: "AI Generates Your Site",
      description: "Our AI creates a complete responsive website in seconds",
    },
    {
      title: "Customize & Launch",
      description: "Tweak with our visual editor and publish with one click",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedText>
            <h2 className="text-4xl font-bold mb-4">How Sitegen Works</h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Creating your dream website has never been easier
            </p>
          </AnimatedText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimatedItem key={index} delay={index * 0.2}>
              <motion.div
                className="flex flex-col items-center text-center p-8 bg-background rounded-xl border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.div
                  className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-6"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <span className="text-2xl font-bold">{index + 1}</span>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}