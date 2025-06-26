"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedText } from "./AnimatedText";

export default function CTASection() {
  const MotionButton = motion(Button);
  const MotionDiv = motion.div;
  const MotionInput = motion(Input);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <MotionDiv
          className="bg-primary/5 rounded-3xl p-8 md:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            scale: 1.01,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Ideas?
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators building faster with Sitegen
            </p>
          </AnimatedText>

          <MotionDiv
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
          >
            <MotionInput
              placeholder="Enter your email"
              className="py-6 text-base"
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <MotionButton
              className="py-6 text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Building Free
            </MotionButton>
          </MotionDiv>

          <AnimatedText delay={0.5}>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Cancel anytime
            </p>
          </AnimatedText>
        </MotionDiv>
      </div>
    </section>
  );
}