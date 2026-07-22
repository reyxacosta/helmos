import * as z from "zod";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .max(100, { error: "Keep it under 100 characters." })
    .optional(),
  email: z.email({ error: "Enter a valid email address." }),
  password: z
    .string()
    .min(8, { error: "Use at least 8 characters." }),
});
