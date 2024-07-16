import { z } from "@repo/ui/components";

export const productFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  oldPrice: z.string().optional(),
  latestPrice: z.string().min(1, "Latest price is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  categoryId: z.string().min(1, "Category is required"),
});

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
});
