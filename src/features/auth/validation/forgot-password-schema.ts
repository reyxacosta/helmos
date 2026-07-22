import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }),
});
