"use server";

import prisma from "@repo/db/client";
import { productFormSchema } from "../schemas/formSchemas";
import { z } from "@repo/ui/components";

const addProduct = async (
  data: {
    title: string;
    oldPrice?: string;
    latestPrice: string;
    shortDescription: string;
    longDescription: string;
    categoryId: string;
  },
  images: string[]
) => {
  const validatedFields = productFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const {
    title,
    oldPrice,
    latestPrice,
    shortDescription,
    longDescription,

    categoryId,
  } = validatedFields.data;

  if (images?.length === 0) {
    return { error: "At least one picture is required" };
  }

  try {
    const product = await prisma.product.create({
      data: {
        title,
        oldPrice,
        latestPrice,
        shortDescription,
        longDescription,
        categoryId,
        images: {
          create: images?.map((url) => ({ url })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    return { success: "Product Added Successfully!", product };
  } catch (error) {
    console.error("Error adding product:", error);
    return { error: "Something went wrong while adding the product." };
  }
};

const getProducts = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  try {
    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          oldPrice: true,
          latestPrice: true,
          shortDescription: true,
          longDescription: true,
          images: {
            select: {
              id: true,
              url: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
          categoryId: true,
          createdAt: true,
        },
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products,
      totalPages,
      currentPage: page,
      success: true,
    };
  } catch (error) {
    return { error: "Failed to retrieve products" };
  }
};

const deleteProduct = async (productId: string) => {
  try {
    await prisma.product.delete({
      where: { id: productId },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete product" };
  }
};

const updateProduct = async (
  productId: string,
  data: z.infer<typeof productFormSchema>
) => {
  const validatedFields = productFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const productData = validatedFields.data;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: productData,
    });

    return {
      success: "Product Updated Successfully!",
      product: updatedProduct,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return { error: "Something went wrong while updating the product." };
  }
};

const getProductsCount = async () => {
  try {
    const data = await prisma.product.count({});
    return data;
  } catch (error) {
    return undefined;
  }
};

export {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductsCount,
};
