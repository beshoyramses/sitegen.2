import Header from "@/components/header/Header";
import CTASection from "@/components/landing/CTASection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import { RocketIcon, ShieldCheckIcon, WrenchIcon, ZapIcon } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <RocketIcon className="h-6 w-6" />,
      title: "Blazing Fast Deployment",
      description:
        "Launch your website in seconds with optimized CI/CD workflows Perfectly.",
    },
    {
      icon: <WrenchIcon className="h-6 w-6" />,
      title: "Customizable Templates",
      description:
        "Start from AI-generated layouts and easily tweak anything to fit your brand.",
    },
    {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      title: "Secure by Default",
      description:
        "Built-in SSL, DDoS protection, and session security — no setup required.",
    },
    {
      icon: <ZapIcon className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description:
        "Describe your idea in a sentence, and let AI build the foundation for you.",
    },
  ];

  const testimonials = [
  {
    name: "Emily Carter",
    role: "Startup Founder",
    content:
      "Sitegen helped us launch a polished landing page in less than an hour. It felt like magic!",
  },
  {
    name: "James Lee",
    role: "Frontend Engineer",
    content:
      "The AI-generated layouts are surprisingly solid. Saved me hours of boilerplate setup.",
  },
  {
    name: "Ava Nguyen",
    role: "Marketing Director",
    content:
      "I could build and customize pages without writing a line of code. Total game changer.",
  },
];


  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
        <HeroSection />
        <FeaturesSection features={features} />
        <HowItWorksSection />
        <TestimonialsSection testimonials={testimonials} />
        <CTASection />
      </div>
    </>
  );
}
