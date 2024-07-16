"use server";

import { z } from "@repo/ui/components";
import { addressFormSchema } from "../schemas/FormSchemas";
import prisma from "@repo/db/client";

const addAddress = async (
  values: z.infer<typeof addressFormSchema>,
  userId: string
) => {
  const validatedFields = addressFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const {
    fullName,
    country,
    phoneNo,
    pinCode,
    houseNo,
    street,
    landmark,
    city,
    state,
    addressType,
    countryCode,
  } = validatedFields.data;

  try {
    await prisma.userAddress.create({
      data: {
        userId,
        fullName,
        country,
        phoneNo,
        pincode: pinCode,
        houseNo,
        street,
        landmark,
        city,
        state,
        addressType,
        countryCode,
      },
    });

    return { success: "Address Added Successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

const fetchAddress = async (userId: string) => {
  if (!userId) {
    return;
  }
  try {
    const data = await prisma.userAddress.findMany({
      where: {
        userId,
      },
    });
    return { success: true, data };
  } catch (error) {
    return { error: "Failed to fetch address" };
  }
};

export { addAddress, fetchAddress };
