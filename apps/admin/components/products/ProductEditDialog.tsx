/* eslint-disable no-unused-vars */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  reactForm,
  zodResolver,
  z,
} from "@repo/ui/components";
import { productFormSchema } from "../../schemas/formSchemas";
import Image from "next/image";
import { Product } from "../../app/(main)/products/page";
import { useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

interface ProductEditDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (values: z.infer<typeof productFormSchema>) => void;
  categories: Category[];
}

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({
  product,
  isOpen,
  onClose,
  onUpdate,
  categories,
}) => {
  if (!product) return null;

  const form = reactForm.useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: product.title,
      oldPrice: product.oldPrice || "",
      latestPrice: product.latestPrice,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      categoryId: product.categoryId,
    },
  });

  const handleSubmit = (values: z.infer<typeof productFormSchema>) => {
    onUpdate(values);
    onClose();
  };

  useEffect(() => {
    form.reset({
      title: product.title,
      oldPrice: product.oldPrice || "",
      latestPrice: product.latestPrice,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      categoryId: product.categoryId,
    });
  }, [product, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='overflow-auto max-h-[700px] rounded-lg max-w-[480px]'>
        <DialogHeader>
          <DialogTitle>Edit Product - {product.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Update the details of the product below.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='oldPrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Price (Optional)</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='latestPrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latest Price</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='shortDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='longDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h4 className='font-medium mb-2 '>Current Images</h4>
              <div className='flex flex-wrap gap-2'>
                {product.images.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image.url}
                      alt={product.title}
                      width={100}
                      height={100}
                      className='rounded w-[100px] h-[100px]'
                    />
                  </div>
                ))}
              </div>
            </div>
            <Button className='flex justify-center w-full' type='submit'>
              Update Product
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditDialog;
