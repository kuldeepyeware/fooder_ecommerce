import { ChevronRight } from "@repo/ui/icons";
import Link from "next/link";

const ProductHeroSection = ({ title }: { title: string | undefined }) => {
  return (
    <section className='h-[70px] w-full bg-[#F9F1E7] flex items-center'>
      <div className='flex items-center gap-2 ml-12'>
        <Link href={"/"}>
          <span className='text-[#9F9F9F]'>Home</span>
        </Link>
        <span>
          <ChevronRight />
        </span>
        <Link href={"/shop"}>
          <span className='text-[#9F9F9F]'>Shop</span>
        </Link>
        <span>
          <ChevronRight />
        </span>
        <span>|</span>
        <span>{title}</span>
      </div>
    </section>
  );
};

export default ProductHeroSection;
