"use server";

import { z } from "@repo/ui/components";
import { queryFormSchema } from "../schemas/FormSchemas";
import prisma from "@repo/db/client";

const addQuery = async (values: z.infer<typeof queryFormSchema>) => {
  const validatedFields = queryFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  try {
    await prisma.query.create({
      data: {
        ...validatedFields.data,
      },
    });
    return { success: "Query sended successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

export { addQuery };
