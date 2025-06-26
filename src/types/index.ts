import { websiteSchema } from "@/lib/validators";
import { z } from "zod";

export type WebsiteFormInput = z.infer<typeof websiteSchema>;