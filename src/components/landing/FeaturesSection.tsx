"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";
import { AnimatedText } from "./AnimatedText";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

interface FeaturesSectionProps {
  features: Feature[];
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <AnimatedSection className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedText>
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional websites at startup
              speed
            </p>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedItem key={index} delay={index * 0.1}>
              <motion.div
                className="hover:shadow-lg transition-shadow group"
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Card>
                  <CardHeader>
                    <motion.div
                      className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
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
