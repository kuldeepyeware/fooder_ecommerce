import ProductHeroSection from "../../../../components/Shop/Product/ProductHeroSection";
import ProductMainSection from "../../../../components/Shop/Product/ProductMainSection";
import ProductDetailSection from "../../../../components/Shop/Product/ProductDetailSection";
import ProductRecommendationSection from "../../../../components/Shop/Product/ProductRecommendationSection";
import { Button } from "@repo/ui/components";
import Link from "next/link";
import ProductDetailSectionMobile from "../../../../components/Shop/Product/ProductDetailSectionMobile";
import { getProductById } from "../../../../data/product";

const ProductRootPage = async ({ params }: { params: { id: string } }) => {
  const data = await getProductById(params.id);

  return (
    <section className='pt-20  text-black'>
      {data ? (
        <>
          <ProductHeroSection title={data?.title} />
          <ProductMainSection
            id={params.id}
            title={data?.title}
            oldPrice={data?.oldPrice as string}
            latestPrice={data?.latestPrice}
            shortDescription={data?.shortDescription}
            reviews={data?.reviews}
            images={data?.images}
          />
          <div className='border-[#D9D9D9] border-t  w-full'></div>
          <ProductDetailSection
            id={params.id}
            longDescription={data?.longDescription}
            reviews={data?.reviews}
          />
          <ProductDetailSectionMobile
            id={params.id}
            longDescription={data?.longDescription}
            reviews={data?.reviews}
          />
          <div className='border-[#D9D9D9] border-t w-full'></div>
          <ProductRecommendationSection
            category={data?.category.name}
            id={params.id}
          />
        </>
      ) : (
        <main className='flex h-full flex-col gap-8 justify-center items-center mt-40'>
          <h1 className='text-4xl font-semibold '>Product not found!</h1>
          <Link href={"/"}>
            <Button className='w-[222px] bg-[#B88E2F] p-8 rounded-none font-bold text-white hover:bg-[#B88E2F]/90'>
              Continue Shopping
            </Button>
          </Link>
        </main>
      )}
    </section>
  );
};

export default ProductRootPage;
