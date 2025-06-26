"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";
import { AnimatedText } from "./AnimatedText";

export default function TestimonialsSection({ testimonials }) {

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedText>
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our community of creators and innovators
            </p>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedItem key={index} delay={index * 0.1}>
              <motion.div
                className="relative overflow-hidden"
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Card>
                  <motion.div
                    className="absolute top-6 -left-4 bg-primary w-16 h-16 rounded-full opacity-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="bg-muted border-2 border-dashed rounded-xl w-16 h-16"
                        animate={{
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                        }}
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      className="text-lg italic"
                      animate={{
                        opacity: [0.9, 1, 0.9],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      "{testimonial.content}"
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}