"use server"

import { z } from "zod";
import { insertWebsiteSchema } from "../validators";
import { verifiySession } from "../session";
import prisma from "@/db/prisma";

export async function createWebsite(
  WebsiteData: z.infer<typeof insertWebsiteSchema>
) {
  const session = await verifiySession();
  if (!session.userId) {
    throw new Error("User not authenticated");
  }

  const validatedData = insertWebsiteSchema.parse({
    ...WebsiteData,
    userId: session.userId,

  });

  if (!validatedData) {
    throw new Error("Invalid website data");
  }

  const website = await prisma.website.create({
    data: validatedData,
  });

  if (!website) {
    return { success: false, message: "Failed to create website" };
  }

  return { success: true, message: "Website created successfully" };
}

export async function getWebsites() {
    const session = await verifiySession();
    if (!session.userId) {
        throw new Error("User not authenticated");
    }
    
    const websites = await prisma.website.findMany({
        where: { userId: session.userId },
        select: {
          name: true,
          userId: true,
          description: true,
          domain: true,
          id: true,
          createdAt: true,
          updatedAt: true,
          imageUrl: true, 

        }
    });
    
    return websites;
}

export async function getWebsiteContent(websiteId: string) {
  const session = await verifiySession();
  if (!session.userId) {
    throw new Error("User not authenticated");
  }

  const website = await prisma.website.findFirst({
    where: { id: websiteId, userId: session.userId },
  });

  if (!website) {
    throw new Error("Website not found or access denied");
  }

  return website;
}

export async function deleteWebsite(websiteId: string) {
  const session = await verifiySession();
  if (!session.userId) {
    throw new Error("User not authenticated");
  }

  const website = await prisma.website.findUnique({
    where: { id: websiteId, userId: session.userId },
  });

  if (!website) {
    throw new Error("Website not found or access denied");
  }

  await prisma.website.delete({
    where: { id: websiteId },
  });

  return { success: true, message: "Website deleted successfully" };
}