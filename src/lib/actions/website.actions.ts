"use server";

import { z } from "zod";
import { websiteSchema } from "@/lib/validators";
import prisma from "@/db/prisma";
import { getUserId } from "../session";
import { redirect } from "next/navigation";

export type WebsiteFormInput = z.infer<typeof websiteSchema>;

export type WebsiteData = {
  id: string;
  name: string;
  domain: string;
  description: string | null;
  faviconUrl: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};


export type FormState =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: Record<string, string[]> };

export async function addWebsite(prevState ,formData: FormData): Promise<FormState> {
  const userId = await getUserId();
  if (!userId) redirect("/sing-in");

  const data = {
    name: formData.get("name"),
    domain: formData.get("domain"),
    description: formData.get("description"),
    faviconUrl: formData.get("faviconUrl"),
    imageUrl: formData.get("imageUrl"),
  };

  const result = websiteSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.website.create({
      data: {
        ...result.data,
        userId,
      },
    });

    return {
      success: true,
      message: "Website created successfully",
    };
  } catch (error) {
    console.error("Error creating website:", error);
    return {
      success: false,
      message: "Server error while creating website",
    };
  }
}

export async function getUserWebsites(): Promise<{
  success: boolean;
  data?: WebsiteData[];
  message?: string;
}> {
  try {
    // Get authenticated user
    const userId = await getUserId();
    
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    // Fetch websites for the current user
    const websites = await prisma.website.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        domain: true,
        description: true,
        faviconUrl: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: websites };
  } catch (error) {
    console.error("Failed to fetch websites:", error);
    return {
      success: false,
      message: "Database error: Failed to fetch websites",
    };
  }
}