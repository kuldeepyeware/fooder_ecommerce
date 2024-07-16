"use server";

import prisma from "@repo/db/client";
import { categoryFormSchema } from "../schemas/formSchemas";

const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        posterImage: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

const addCategory = async (
  data: {
    name: string;
  },
  image: string
) => {
  const validatedFields = categoryFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  if (!image) {
    return { error: "At least one picture is required" };
  }

  const { name } = validatedFields.data;

  try {
    await prisma.category.create({
      data: {
        name,
        posterImage: image,
      },
    });

    return { success: "Category Added Successfully!" };
  } catch (error) {
    console.error("Error adding category:", error);
    return { error: "Something went wrong while adding the category." };
  }
};

const deleteCategory = async (categoryId: string) => {
  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete category" };
  }
};

export { getCategories, addCategory, deleteCategory };
