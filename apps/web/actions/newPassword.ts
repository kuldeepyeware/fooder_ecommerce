"use server";

import { z } from "@repo/ui/components";
import { newPasswordSchema } from "../schemas/FormSchemas";
import { getPasswordTokenByToken } from "../data/passwordResetToken";
import { getUserByEmail } from "../data/user";
import { hash } from "bcryptjs";
import prisma from "@repo/db/client";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  } catch (error) {
    return { error: "Failed to change password! Try again" };
  }

  return { success: "Password Updated!" };
};
