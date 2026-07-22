import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { error: "Use at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match.",
    path: ["confirmPassword"],
  });
