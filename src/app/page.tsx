import Header from "@/components/header/Header";
import CTASection from "@/components/landing/CTASection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import { LightningBoltIcon } from "@radix-ui/react-icons";

export default function Home() {
  const features = [
    {
      icon: <LightningBoltIcon className="h-6 w-6" />,
      title: "Instant Deployment",
      description:
        "From idea to live site in under 60 seconds with AI-powered generation",
    },
    {
      icon: <LightningBoltIcon className="h-6 w-6" />,
      title: "Instant Deployment",
      description:
        "From idea to live site in under 60 seconds with AI-powered generation",
    },
    {
      icon: <LightningBoltIcon className="h-6 w-6" />,
      title: "Instant Deployment",
      description:
        "From idea to live site in under 60 seconds with AI-powered generation",
    },
    {
      icon: <LightningBoltIcon className="h-6 w-6" />,
      title: "Instant Deployment",
      description:
        "From idea to live site in under 60 seconds with AI-powered generation",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content:
        "Sitegen cut our development time by 80%. We went from concept to launch in one afternoon!",
    },
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content:
        "Sitegen cut our development time by 80%. We went from concept to launch in one afternoon!",
    },
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content:
        "Sitegen cut our development time by 80%. We went from concept to launch in one afternoon!",
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