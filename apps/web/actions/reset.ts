"use server";

import { resetPasswordSchema } from "../schemas/FormSchemas";
import { getUserByEmail } from "../data/user";
import { z } from "@repo/ui/components";
import { generatePasswordResetToken } from "../lib/tokens";
import { sendPasswordResetEmail } from "../lib/mail";

export const reset = async (values: z.infer<typeof resetPasswordSchema>) => {
  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  if (passwordResetToken) {
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
  } else {
    return { error: "Failed to fetch token! Try again" };
  }

  return { success: "Reset email sent!" };
};
