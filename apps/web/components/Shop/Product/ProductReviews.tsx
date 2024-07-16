/* eslint-disable no-unused-vars */
"use client";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  FormControl,
  reactForm,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  zodResolver,
  Form,
  z,
  Input,
  Textarea,
} from "@repo/ui/components";
import { CircleUserRound, Plus } from "@repo/ui/icons";
import { reviewsProps } from "./ProductDetailSection";
import UserReviewStar from "../../Common/UserReviewStar";
import Image from "next/image";
import FormSuccess from "../../Form/formSuccess";
import FormError from "../../Form/formError";
import { ChangeEvent, useState, useTransition } from "react";
import { reviewFormSchema } from "../../../schemas/FormSchemas";
import { useSession } from "next-auth/react";
import { Star } from "@repo/ui/icons";
import { addReview, fetchReviews } from "../../../actions/reviews";

const ProductReviews = ({
  reviews: intialReviews,
  id: productId,
}: {
  reviews: reviewsProps[] | undefined;
  id: string;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [reviews, setReviews] = useState<reviewsProps[] | undefined>(
    intialReviews
  );
  const [isPending, startTransition] = useTransition();
  const session = useSession();
  const userId = session?.data?.user?.id;
  const userName = session?.data?.user?.name;

  const form = reactForm.useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      reviewTitle: "",
      reviewDescription: "",
      reviewStars: 0,
      image: undefined,
    },
  });

  const fetchProductReviews = async (productId: string) => {
    const fetchedReviews = await fetchReviews(productId);
    if (fetchedReviews?.success) {
      setReviews(fetchedReviews.data || []);
    } else {
      setReviews([]);
    }
  };

  const uploadFile = async (
    file: File
  ): Promise<{
    url: string;
    fileName: string;
  }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileData = event.target?.result;
        if (fileData) {
          const fileName: string = `Reviews_Images/${file.name}`;
          const presignedURL = new URL("/api/upload", window.location.href);
          presignedURL.searchParams.set(
            "fileName",
            `Reviews_Images/${file.name}`
          );
          presignedURL.searchParams.set("contentType", file.type);
          try {
            const res = await fetch(presignedURL.toString());
            const { signedUrl } = await res.json();

            const body = new Blob([fileData], { type: file.type });
            await fetch(signedUrl, {
              body,
              method: "PUT",
            });
            resolve({
              url: signedUrl.split("?")[0],
              fileName: fileName,
            });
          } catch (error) {
            console.error("Error uploading file:", error);
            reject(error);
          }
        } else {
          reject(new Error("Failed to read file data"));
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  async function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    setSuccess("");
    setError("");

    if (!userId) {
      setError("Login Required");
      return;
    }

    try {
      let fileName: string | undefined;

      if (values.image instanceof File) {
        const uploadResult = await uploadFile(values.image);
        fileName = uploadResult.fileName;
      }

      if (values && fileName && productId && userName) {
        const result = await addReview({
          reviewTitle: values.reviewTitle,
          reviewDescription: values.reviewDescription,
          reviewStars: values.reviewStars,
          fileName,
          productId,
          userName,
        });
        if (result.error) {
          setError(result.error);
        } else if (result.success) {
          setSuccess(result.success);
          fetchProductReviews(productId);
        }
      }
    } catch (error) {
      setError("An error occurred while submitting the review");
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <Collapsible className='flex justify-center items-center flex-col gap-5'>
          <CollapsibleTrigger className='flex  items-center border rounded-lg gap-1 p-2'>
            <Plus strokeWidth={2} className='text-blue-500' />
            <span className=' text-blue-500 font-semibold'>
              Add your review
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => {
                  startTransition(() => {
                    onSubmit(values);
                  });
                })}
                className='space-y-8  flex flex-col items-center justify-center '>
                <FormField
                  control={form.control}
                  name='reviewStars'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg text-center flex justify-center'>
                        Overall rating
                      </FormLabel>
                      <FormControl>
                        <StarRating
                          totalStars={5}
                          onRatingChange={(rating) => field.onChange(rating)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='reviewTitle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg'>Add a headline</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type='text'
                          className='w-[300px]  border-[#9F9F9F]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='reviewDescription'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg'>
                        Add a written review
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          className='w-[300px]  border-[#9F9F9F]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='image'
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel className='text-lg'>Add a photo</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type='file'
                          className='w-[300px] border-[#9F9F9F] cursor-pointer'
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormSuccess message={success} />
                <FormError message={error} />

                <Button
                  type='submit'
                  disabled={isPending}
                  className=' font-light h-full text-[20px] px-8 bg-[#B88E2F] text-white  hover:bg-[#B88E2F]/90 '>
                  Add
                </Button>
              </form>
            </Form>
          </CollapsibleContent>
        </Collapsible>
      </div>
      {reviews?.map((review) => (
        <div
          className='flex flex-col gap-2 w-full flex-wrap'
          key={`${review.id}-${review.productId}`}>
          <div className='flex items-center gap-2'>
            <CircleUserRound size={35} strokeWidth={1} />
            {`${review?.firstName} ${review?.lastName}`}
          </div>
          <div className='flex items-center gap-2'>
            {review && <UserReviewStar reviewStar={review?.reviewStars} />}
            <span className='font-bold'>{review.reviewTitle}</span>
          </div>
          <div className='text-[#a0a0a0]'>
            {`Reviewed on ${review.createdAt.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}`}
          </div>
          <div>{review.reviewDescription}</div>
          <div>
            {review?.image && (
              <Image
                src={review.image}
                alt=''
                height={1000}
                width={1000}
                className='w-[150px] h-[150px] rounded-lg'
              />
            )}
          </div>
          <div className='border-[#D9D9D9] border-t mt-4 w-full mb-4'></div>
        </div>
      ))}
    </>
  );
};

export default ProductReviews;

interface StarRatingProps {
  totalStars: number;
  onRatingChange: (rating: number) => void;
  value: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  totalStars,
  onRatingChange,
  value,
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className='flex justify-center items-center'>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type='radio'
              name='rating'
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              className='hidden'
            />
            <Star
              className='cursor-pointer transition-colors duration-200'
              size={30}
              fill={ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9"}
              stroke={ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};
