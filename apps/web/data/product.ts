"use server";

import prisma from "@repo/db/client";

export const fetchCategories = async () => {
  try {
    return await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    return null;
  }
};

export const fetchProducts = async (categoryId: string) => {
  const where = categoryId !== "all" ? { categoryId } : {};

  try {
    return await prisma.product.findMany({
      where,
      select: {
        id: true,
        title: true,
        oldPrice: true,
        latestPrice: true,
        reviews: {
          select: {
            reviewStars: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
      },
    });
  } catch (error) {
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const data = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        oldPrice: true,
        latestPrice: true,
        shortDescription: true,
        longDescription: true,
        category: {
          select: {
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
        reviews: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            productId: true,
            reviewTitle: true,
            reviewDescription: true,
            reviewStars: true,
            image: true,
            createdAt: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export const getProductsForHomePage = async () => {
  try {
    const data = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        oldPrice: true,
        latestPrice: true,
        reviews: {
          select: {
            reviewStars: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
      },
      take: 8,
    });
    return data;
  } catch (error) {
    return null;
  }
};

export const getProductsFoRecommendations = async (
  category: string,
  id: string
) => {
  try {
    const data = await prisma.product.findMany({
      where: {
        category: {
          name: category,
        },
        NOT: {
          id: id,
        },
      },
      select: {
        id: true,
        title: true,
        oldPrice: true,
        latestPrice: true,
        shortDescription: true,
        longDescription: true,
        images: {
          select: {
            url: true,
          },
        },
        reviews: {
          select: {
            reviewStars: true,
          },
        },
      },
      take: 4,
    });

    return data;
  } catch (error) {
    return null;
  }
};
