"use server";

import prisma from "@/db/prisma";
import { signInFormSchema, signUpFormSchema } from "../validators";
import { compareSync, hashSync } from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createSession } from "../session";
import { ZodError } from "zod";

interface ActionState {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string | undefined>;
}

export async function signUpUser(prevState: any, formData: FormData): Promise<ActionState> {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const hashedPassword = hashSync(user.password, 10);

    const userData = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    await createSession(userData.id);

    return { success: true, message: "User signed up successfully." };
    
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const fieldName = err.path[0];
        if (fieldName) {
          fieldErrors[fieldName] = err.message;
        }
      });
      
      return { 
        success: false, 
        message: "Validation error",
        fieldErrors 
      };
    }
    
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return {
        success: false,
        message: "Email already exists",
        fieldErrors: { email: "This email is already registered" }
      };
    }

    console.error("Signup error:", error);
    return { 
      success: false, 
      message: "An unexpected error occurred. Please try again later." 
    };
  }
}

export async function signInUser(prevState: any, formData: FormData): Promise<ActionState> {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const userData = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userData) {
      return { success: false, message: "Invalid email or password." };
    }

    // Compare password
    if (!compareSync(user.password, userData.password)) {
      return { success: false, message: "Invalid email or password." };
    }

    await createSession(userData.id);

    return { success: true, message: "User signed in successfully." };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const fieldName = err.path[0];
        if (fieldName) {
          fieldErrors[fieldName] = err.message;
        }
      });
      
      return { 
        success: false, 
        message: "Validation error",
        fieldErrors 
      };
    }
    
    console.error("Signin error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function getUserById(userId: string) {
  const userData = await prisma.user.findUnique({
      where: { id: userId },
    });

  return userData;
}