import Link from "next/link";
import ProductCard from "../../Common/ProductCard";
import { Button } from "@repo/ui/components";
import { getProductsFoRecommendations } from "../../../data/product";

const ProductRecommendationSection = async ({
  category,
  id,
}: {
  category: string;
  id: string;
}) => {
  const data = await getProductsFoRecommendations(category, id);

  return (
    <section className='flex mt-[56px] flex-col w-full items-center mb-[30px]'>
      {data && data?.length >= 1 && (
        <>
          <div className=' font-bold text-[36px]'>Related Products</div>
          <div className='flex flex-wrap gap-5 justify-center mx-7 mt-[32px]'>
            {data?.map((item, index) => <ProductCard {...item} key={index} />)}
          </div>
          <div className='mt-[32px]'>
            <Link href={"/shop"}>
              <Button className='text-[16px] font-semibold bg-white border rounded-none py-3 px-20 border-[#B88E2F] text-[#B88E2F] hover:bg-white  hover:text-[#B88E2F]/90'>
                Show More
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductRecommendationSection;
