"use server";

import prisma from "@repo/db/client";

const getQueries = async (page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;

  const [totalQueries, queries] = await Promise.all([
    prisma.query.count(),
    prisma.query.findMany({
      skip,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    }),
  ]);

  const totalPages = Math.ceil(totalQueries / pageSize);

  return { queries, totalPages };
};

const deleteQuery = async (queryId: string) => {
  try {
    await prisma.query.delete({
      where: { id: queryId },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete query" };
  }
};

export { getQueries, deleteQuery };
