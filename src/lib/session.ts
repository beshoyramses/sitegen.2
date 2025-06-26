"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.ENCRYPTION_KEY);

const cookie = {
  name: "session",
  duration: 1000 * 60 * 60 * 24 * 30, // 30 days
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
};

export async function encrypt(payload: any) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);

  return jwt;
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token as string, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });

  const cookieStore = await cookies();
  cookieStore.set(cookie.name, session, { ...cookie.options, expires });  
}

export async function verifiySession() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(cookie.name)?.value;

    if (!cookieValue) {
    redirect('/sign-in');
  }

  const session = await decrypt(cookieValue as string);

  if (!session?.userId) {
    redirect('/sign-in');
  }

  return { userId: session.userId };
}

export async function deleteSession () {
    cookies().delete(cookie.name);
};

export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(cookie.name)?.value;

  if (!cookieValue) return null;

  const session = await decrypt(cookieValue);

  if (!session?.userId) return null;

  return session.userId as string;
}
