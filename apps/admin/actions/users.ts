"use server";

import prisma from "@repo/db/client";
import { get30DaysAgoDate } from "../lib/get30DaysAgoDate";

const getLast30DaysUser = async () => {
  const { thirtyDaysAgo } = get30DaysAgoDate();

  try {
    const data = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
          lte: new Date(),
        },
      },
    });

    const formattedLength = data.length.toLocaleString("en-IN");

    return {
      success: "All 30 days ago order captured successfully!",
      formattedLength,
    };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export { getLast30DaysUser };
