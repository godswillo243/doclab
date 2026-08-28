import { z } from "zod";

export const signUpSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),

  displayName: z.string().min(3).max(100),
  password: z.string().min(8).max(72),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const verifyEmailSchema = z.object({
  email: z.email(),

  code: z.string().length(6),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
