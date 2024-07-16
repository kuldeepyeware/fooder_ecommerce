"use server";

import prisma from "@repo/db/client";

export const getCategories = async () => {
  try {
    const data = await prisma.category.findMany({
      take: 3,
    });
    return data;
  } catch (error) {
    return null;
  }
};
