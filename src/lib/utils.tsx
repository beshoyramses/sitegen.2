import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ComponentType } from "@/types";
import { 
  LayoutDashboard, 
  ServerIcon,
  Image, 
  Columns,
  List,
  Video,
  MapPin,
  Text
} from 'lucide-react';
import { Template, Component } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}


export const componentTypes: ComponentType[] = [
  { id: 'hero', name: 'Hero Section', icon: <LayoutDashboard size={20} /> },
  { id: 'text', name: 'Text Block', icon: <Text size={20} /> },
  { id: 'image', name: 'Image', icon: <Image size={20} /> },
  { id: 'button', name: 'Button', icon: <ServerIcon size={20} /> },
  { id: 'features', name: 'Features', icon: <Columns size={20} /> },
  { id: 'testimonials', name: 'Testimonials', icon: <List size={20} /> },
  { id: 'video', name: 'Video Embed', icon: <Video size={20} /> },
  { id: 'map', name: 'Map', icon: <MapPin size={20} /> },
];


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