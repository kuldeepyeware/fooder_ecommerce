"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Input,
  zodResolver,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  reactForm,
  z,
  Label,
} from "@repo/ui/components";
import { TrashIcon } from "@repo/ui/icons";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import FormSuccess from "../../../components/form/formSuccess";
import FormError from "../../../components/form/formError";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../../../actions/category";
import { uploadCategoryImage } from "../../../utils/uploadFiles";
import { categoryFormSchema } from "../../../schemas/formSchemas";
import { BeatLoader } from "react-spinners";

export interface Category {
  id: string;
  name: string;
  posterImage: string;
}

const CategoriesPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  const form = reactForm.useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof categoryFormSchema>) => {
    setSuccess("");
    setError("");

    try {
      if (imageFiles.length === 0) {
        setError("At least one image is required");
        return;
      }

      if (!imageFiles[0]) {
        setError("At least one image is required");
        return;
      }

      const uploadedImage = await uploadCategoryImage(imageFiles[0]);

      const result = await addCategory(values, uploadedImage.url);
      if (result.success) {
        setSuccess(result.success);
        setImageFiles([]);
        setImagePreviews([]);
        form.reset();
        fetchCategories();
      } else {
        setError("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while adding the product. Please try again.");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const result = await deleteCategory(categoryId);
      if (result.success) {
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
      } else {
        alert("Failed to delete category. Please try again.");
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);

      setError("");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className='flex-1 p-6 max-w-[450px] sm:max-w-full'>
      <div className='flex flex-col gap-8'>
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
            <CardDescription>
              Fill out the form to add a new category of product to your store.
            </CardDescription>
          </CardHeader>
          <CardContent className='w-full'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => {
                  startTransition(() => {
                    onSubmit(values);
                  });
                })}
                className='space-y-8  flex flex-col items-center w-full h-full '>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg'>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter category Name'
                          disabled={isPending}
                          {...field}
                          className='md:w-[450px] w-[300px]  border-[#9F9F9F]'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Label className='text-lg'>Image</Label>
                  <Input
                    type='file'
                    className='md:w-[450px] w-[300px] mt-3 border-[#9F9F9F] '
                    disabled={isPending}
                    onChange={(e) => {
                      handleImageUpload(e);
                    }}
                  />

                  {error && error.includes("image") && (
                    <p className='text-red-500 mt-3'>{error}</p>
                  )}
                  <div className='flex flex-wrap gap-2  mt-3'>
                    {imagePreviews.map((preview, index) => (
                      <Image
                        key={index}
                        src={preview}
                        alt={`Product image ${index + 1}`}
                        width={80}
                        height={80}
                      />
                    ))}
                  </div>
                </div>

                <FormSuccess message={success} />
                <FormError message={error} />

                <Button
                  type='submit'
                  disabled={isPending}
                  className=' h-full text-[20px] px-8 '>
                  Add
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          {categories.length ? (
            <>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Poster Image</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <span className='font-medium'>{category.name}</span>
                        </TableCell>
                        <TableCell>
                          <Image
                            src={category?.posterImage as string}
                            alt='Category images'
                            height={100}
                            width={100}
                            className='w-[100px] h-[100px]'
                          />
                        </TableCell>

                        <TableCell>
                          <Button
                            variant='outline'
                            size='icon'
                            onClick={() => handleDeleteCategory(category.id)}>
                            <TrashIcon className='h-4 w-4' />
                            <span className='sr-only'>Delete Category</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </>
          ) : (
            <div className='ml-7 min-h-[200px] justify-center items-center flex'>
              <BeatLoader />
            </div>
          )}
        </Card>
      </div>
    </main>
  );
};

export default CategoriesPage;
