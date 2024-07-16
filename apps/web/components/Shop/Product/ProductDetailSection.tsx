import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components";

import ReviewStar from "../../Common/ReviewStar";
import ProductReviews from "./ProductReviews";

export interface reviewsProps {
  id: string;
  firstName: string;
  lastName: string;
  productId: string;
  reviewTitle: string;
  reviewDescription: string;
  reviewStars: number;
  image: string | null;
  createdAt: Date;
}

const ProductDetailSection = ({
  id,
  longDescription,
  reviews,
}: {
  id: string;
  longDescription: string | undefined;
  reviews: reviewsProps[] | undefined;
}) => {
  return (
    <section className='mt-[48px] md:flex justify-center hidden mb-[65px]'>
      <Tabs defaultValue='description' className='w-full px-[120px]'>
        <TabsList className=' bg-white flex  gap-7 mb-9'>
          <TabsTrigger value='description' className='text-[24px] '>
            Description
          </TabsTrigger>
          <TabsTrigger value='review' className='text-[24px]'>
            Reviews [{reviews?.length}]
          </TabsTrigger>
        </TabsList>
        <TabsContent value='description' className='w-full '>
          <div className=' text-[#9F9F9F] text-justify '>{longDescription}</div>
        </TabsContent>
        <TabsContent
          value='review'
          className='flex justify-center items-center flex-col gap-5'>
          <div className='flex justify-center items-center gap-2 flex-col w-full'>
            {reviews && reviews.length >= 1 && (
              <h1 className='text-2xl font-semibold'>Customer Reviews</h1>
            )}
            <div>{reviews && <ReviewStar reviews={reviews} size={35} />}</div>
          </div>
          <ProductReviews id={id} reviews={reviews} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductDetailSection;
