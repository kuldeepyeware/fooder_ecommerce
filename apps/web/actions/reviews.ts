"use server";

import { reviewFormSchema } from "../schemas/FormSchemas";
import prisma from "@repo/db/client";

const addReview = async (data: {
  reviewTitle: string;
  reviewDescription: string;
  reviewStars: number;
  fileName: string;
  productId: string;
  userName: string;
}) => {
  const {
    reviewTitle,
    reviewDescription,
    reviewStars,
    fileName,
    productId,
    userName,
  } = data;

  const validatedFields = await reviewFormSchema.safeParse({
    reviewTitle,
    reviewDescription,
    reviewStars,
  });

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  try {
    const imageUrl = `https://d3rts3x4c8sg1r.cloudfront.net/${fileName}`;
    await prisma.review.create({
      data: {
        firstName: userName.split(" ")[0] as string,
        lastName: userName.split(" ")[1] as string,
        productId,
        reviewTitle,
        reviewDescription,
        reviewStars,
        image: imageUrl,
      },
    });
    return { success: "Review Added Successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

const fetchReviews = async (productId: string) => {
  if (!productId) {
    return;
  }

  try {
    const data = await prisma.review.findMany({
      where: {
        productId,
      },
    });
    return { success: true, data };
  } catch (error) {
    return { error: "Failed to fetch reviews! Try again" };
  }
};

export { addReview, fetchReviews };
