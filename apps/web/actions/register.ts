"use server";

import { z } from "@repo/ui/components";
import { registerFormSchema } from "../schemas/FormSchemas";
import { hash } from "bcryptjs";
import prisma from "@repo/db/client";
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "../lib/tokens";
import { sendVerificationEmail } from "../lib/mail";

const register = async (values: z.infer<typeof registerFormSchema>) => {
  const validatedFields = registerFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  const hashedPassword = await hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email Already Taken" };
  }

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return { error: "Failed to create account! Try again" };
  }

  const verificationToken = await generateVerificationToken(email);

  if (verificationToken) {
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  } else {
    return { error: "Failed to fetch token! Try again" };
  }

  return { success: "Confirmation Email Sent!" };
};

export { register };
