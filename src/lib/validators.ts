import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const websiteSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  domain: z.string(),
  description: z.string().optional(),
  faviconUrl: z.string().url("Invalid favicon URL").optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});