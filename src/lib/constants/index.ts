// data/templates.ts
import { Template, Component } from "@/types";

export const templates: Template[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Complete landing page with hero, features, testimonials and CTA',
    components: [
      { 
        id: 'hero1', 
        type: 'hero', 
        title: 'Welcome to Our Platform', 
        subtitle: 'Transform your ideas into reality with our powerful tools', 
        buttonText: 'Get Started',
      },
      // ... other components
    ]
  },
  // ... other templates
];