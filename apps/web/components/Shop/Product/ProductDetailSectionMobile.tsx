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

const ProductDetailSectionMobile = ({
  id,
  longDescription,
  reviews,
}: {
  id: string;
  longDescription: string | undefined;
  reviews: reviewsProps[] | undefined;
}) => {
  return (
    <section className='mt-[48px] md:hidden justify-center flex flex-col gap-5 mb-[65px] px-[40px]'>
      <div className='space-y-5'>
        <h2 className='text-[24px]  font-semibold'>Description</h2>
        <div className=' text-[#9F9F9F] '>{longDescription}</div>
      </div>
      <div className='flex justify-start items-center flex-col gap-5'>
        <div className='flex justify-start items-center gap-2 flex-col w-full'>
          <h2 className='text-2xl font-semibold'>
            Reviews [{reviews?.length}]
          </h2>
          <div>{reviews && <ReviewStar reviews={reviews} size={35} />}</div>
        </div>
        <ProductReviews id={id} reviews={reviews} />
      </div>
    </section>
  );
};

export default ProductDetailSectionMobile;
