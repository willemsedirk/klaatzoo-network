"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import { db } from "@/lib/db";
import { loginSchema, registerSchema } from "@/lib/validations";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  // Look up the user's role to determine redirect destination
  const user = await db.user.findUnique({
    where: { email: parsed.data.email },
    select: { role: true },
  });

  const redirectTo = user?.role === "ADMIN" || user?.role === "MODERATOR"
    ? "/admin"
    : "/dashboard";

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong. Please try again." };
      }
    }
    throw error; // Re-throw redirect errors (these are expected)
  }
}

export async function registerAction(formData: FormData) {
  const rawData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const parsed = registerSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  // Check for existing user
  const existingEmail = await db.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existingEmail) {
    return { error: "An account with this email already exists" };
  }

  const existingUsername = await db.user.findUnique({
    where: { username: parsed.data.username },
  });
  if (existingUsername) {
    return { error: "This username is already taken" };
  }

  // Hash password and create user
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await db.user.create({
    data: {
      email: parsed.data.email,
      username: parsed.data.username,
      passwordHash,
      role: "APPLICANT",
    },
  });

  // Auto-login after registration
  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created but login failed. Please try logging in." };
    }
    throw error;
  }
}
