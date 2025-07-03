import { websiteSchema } from "@/lib/validators";
import { ReactNode } from 'react';
import { z } from "zod";

export type WebsiteFormInput = z.infer<typeof websiteSchema>;

export interface Component {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  content?: string;
  text?: string;
  alt?: string;
  features?: Feature[];
  testimonials?: Testimonial[];
}

export interface Feature {
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  components: Component[];
}

export interface ComponentType {
  id: string;
  name: string;
  icon: ReactNode;
}