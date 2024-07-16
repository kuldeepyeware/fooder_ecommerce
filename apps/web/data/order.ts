"use server";

import prisma from "@repo/db/client";

export const getOrderItem = async (id: string) => {
  try {
    const data = await prisma.orderItem.findUnique({
      where: {
        id,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};
