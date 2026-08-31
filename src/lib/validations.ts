import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(24, "Username must be at most 24 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const applicationAnswerSchema = z.record(
  z.string(),
  z.union([z.string(), z.array(z.string())])
);

export const applicationNoteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty").max(2000, "Note is too long"),
});

export const statusUpdateSchema = z.object({
  status: z.enum(["PENDING", "UNDER_REVIEW", "ACCEPTED", "REJECTED"]),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type StatusUpdateInput = z.infer<typeof statusUpdateSchema>;
