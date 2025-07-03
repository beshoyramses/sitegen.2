import { websiteSchema } from "@/lib/validators";
import { ReactNode } from 'react';
import { z } from "zod";
import { 
  LayoutDashboard, 
  Text, 
  Image, 
  SettingsIcon,
  Columns,
  List,
  Video,
  MapPin
} from 'lucide-react';


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

export const componentTypes: ComponentType[] = [
  { id: 'hero', name: 'Hero Section', icon: <LayoutDashboard size={20} /> },
  { id: 'text', name: 'Text Block', icon: <Text size={20} /> },
  { id: 'image', name: 'Image', icon: <Image size={20} /> },
  { id: 'button', name: 'Button', icon: <SettingsIcon size={20} /> },
  { id: 'features', name: 'Features', icon: <Columns size={20} /> },
  { id: 'testimonials', name: 'Testimonials', icon: <List size={20} /> },
  { id: 'video', name: 'Video Embed', icon: <Video size={20} /> },
  { id: 'map', name: 'Map', icon: <MapPin size={20} /> },
];