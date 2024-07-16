"use server";

import prisma from "@repo/db/client";

interface SearchResult {
  success: boolean;
  products?: {
    id: string;
    title: string;
    latestPrice: string;
    images: { url: string }[];
  }[];
  error?: string;
}

export async function searchProducts(query: string): Promise<SearchResult> {
  if (!query) {
    return { success: true, products: [] };
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          {
            category: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
          { shortDescription: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        images: {
          select: {
            url: true,
          },
        },
        id: true,
        title: true,
        latestPrice: true,
      },
      take: 10,
    });

    return { success: true, products };
  } catch (error) {
    return { success: false, error: "An error occurred while searching" };
  }
}
