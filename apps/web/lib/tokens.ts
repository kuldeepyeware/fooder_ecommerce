import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "../data/verificationToken";
import prisma from "@repo/db/client";
import { getPasswordTokenByEmail } from "../data/passwordResetToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    try {
      await prisma.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    } catch (error) {
      return null;
    }
  }

  try {
    const verificationToken = await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordTokenByEmail(email);

  if (existingToken) {
    try {
      await prisma.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    } catch (error) {
      return null;
    }
  }

  try {
    const passwordResetToken = await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
