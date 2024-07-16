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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Input,
  Textarea,
  zodResolver,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  reactForm,
  z,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
} from "@repo/ui/components";
import { FilePenIcon, TrashIcon } from "@repo/ui/icons";
import { CardFooter } from "@repo/ui/uicomponents/ui/card";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import FormSuccess from "../../../components/form/formSuccess";
import FormError from "../../../components/form/formError";
import { getCategories } from "../../../actions/category";
import { uploadMultipleFiles } from "../../../utils/uploadFiles";
import { productFormSchema } from "../../../schemas/formSchemas";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../../actions/product";
import { BeatLoader } from "react-spinners";
import ProductEditDialog from "../../../components/products/ProductEditDialog";

export interface Product {
  id: string;
  title: string;
  oldPrice?: string | null;
  latestPrice: string;
  shortDescription: string;
  longDescription: string;
  images: {
    id: string;
    url: string;
  }[];
  categoryId: string;
  category: {
    name: string;
  };
  createdAt: Date;
}

const ProductsPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const result = await getProducts(page);
      if (result.success) {
        setProducts(result.products);
        setTotalPages(result.totalPages);
      } else {
        setProducts([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(productId);
      if (result.success) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        alert("Failed to delete order. Please try again.");
      }
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = async (
    values: z.infer<typeof productFormSchema>
  ) => {
    if (!editingProduct) return;

    try {
      const result = await updateProduct(editingProduct.id, values);
      if (result.success) {
        setIsEditDialogOpen(false);
        fetchProducts(currentPage);
      } else {
        console.error("Error updating product:", result.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const form = reactForm.useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      oldPrice: "",
      latestPrice: "",
      shortDescription: "",
      longDescription: "",
      categoryId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    setSuccess("");
    setError("");

    try {
      if (imageFiles.length === 0) {
        setError("At least one image is required");
        return;
      }

      const uploadedImages = await uploadMultipleFiles(imageFiles);

      const images = uploadedImages.map((img) => img.url);

      const result = await addProduct(values, images);
      if (result.success) {
        setSuccess(result.success);
        setImageFiles([]);
        setImagePreviews([]);
        form.reset();
        fetchProducts(currentPage);
      } else {
        setError("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while adding the product. Please try again.");
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
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  return (
    <main className='flex-1 p-6 max-w-[450px] sm:max-w-full '>
      <div className='flex flex-col gap-8'>
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>
              Fill out the form to add a new product to your store.
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
                className='space-y-8  flex flex-col items-center w-full h-full'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter product title'
                          disabled={isPending}
                          {...field}
                          className='md:w-[450px] w-[300px]  border-[#9F9F9F]'
                        />
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
                        <Input
                          type='number'
                          placeholder='Enter old price'
                          className='md:w-[450px] w-[300px]  border-[#9F9F9F]'
                          disabled={isPending}
                          {...field}
                        />
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
                        <Input
                          type='number'
                          placeholder='Enter latest price'
                          className='md:w-[450px] w-[300px]  border-[#9F9F9F]'
                          disabled={isPending}
                          {...field}
                        />
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
                        <Textarea
                          placeholder='Enter short description'
                          className='md:w-[450px] w-[300px]  border-[#9F9F9F]'
                          disabled={isPending}
                          {...field}
                        />
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
                        <Textarea
                          placeholder='Enter long description'
                          className='md:w-[450px] w-[300px]  border-[#9F9F9F]'
                          disabled={isPending}
                          {...field}
                        />
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
                        defaultValue={field.value}
                        disabled={isPending}>
                        <FormControl>
                          <SelectTrigger className='md:w-[450px] w-[300px]  border-[#9F9F9F]'>
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
                  <Label className=' '>Images</Label>
                  <Input
                    type='file'
                    multiple
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
          {products.length >= 1 ? (
            <>
              <CardContent>
                {isLoading ? (
                  <div className='ml-7 min-h-[200px] justify-center items-center flex'>
                    <BeatLoader />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Image
                              src={product.images[0]?.url as string}
                              alt='Product images'
                              height={100}
                              width={100}
                            />
                          </TableCell>
                          <TableCell>
                            <time dateTime={product.createdAt.toDateString()}>
                              {new Date(product.createdAt).toLocaleDateString()}
                            </time>
                          </TableCell>
                          <TableCell>
                            <span className='font-medium'>{product.title}</span>
                          </TableCell>
                          <TableCell>&#8377;{product.latestPrice}</TableCell>
                          <TableCell>{product.category.name}</TableCell>
                          <TableCell className='p-0'>
                            <div className='flex justify-center items-center gap-4 h-full'>
                              <Button
                                variant='outline'
                                size='icon'
                                onClick={() => handleEditProduct(product)}>
                                <FilePenIcon className='h-4 w-4' />
                                <span className='sr-only'>Edit product</span>
                              </Button>

                              <Button
                                variant='outline'
                                size='icon'
                                onClick={() => handleDeleteProduct(product.id)}>
                                <TrashIcon className='h-4 w-4' />
                                <span className='sr-only'>Delete order</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={currentPage === index + 1}
                          onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </>
          ) : (
            <div className='ml-7 min-h-[200px] justify-center text-xl font-medium items-center flex'>
              No products added yet
            </div>
          )}
        </Card>
      </div>
      <ProductEditDialog
        product={editingProduct}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onUpdate={handleUpdateProduct}
        categories={categories}
      />
    </main>
  );
};

export default ProductsPage;
