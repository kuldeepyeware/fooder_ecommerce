import { ChevronRight } from "@repo/ui/icons";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className='h-[200px] w-full bg-center bg-cover bg-custom-bg2 flex justify-center items-center flex-col'>
      <div className='text-[48px] font-medium'>Shop</div>
      <div className='flex gap-2'>
        <Link href={"/"}>
          <span className='font-bold'>Home</span>
        </Link>
        <span>
          <ChevronRight />
        </span>
        <span>Shop</span>
      </div>
    </section>
  );
};

export default HeroSection;
