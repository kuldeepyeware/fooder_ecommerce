import { Button } from "@repo/ui/components";

const Banner = () => {
  return (
    <section className='flex justify-end items-center h-screen bg-no-repeat bg-bottom bg-custom-bg bg-cover'>
      <div className='bg-[#FFF3E3] md:mr-10 mx-4 p-11 rounded-lg'>
        <p className='text-black font-bold text-[18px] '>New Arrival</p>
        <p className='text-[#B88E2F] py-4 md:py-2 text-[50px] leading-tight md:text-large font-extrabold'>
          Discover Our <br /> New Collection
        </p>
        <p className='text-[#666666] text-[18px] mb-[46px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
        <Button className='w-[222px] bg-[#B88E2F] p-8 rounded-none font-bold text-white hover:bg-[#B88E2F]/90'>
          BUY NOW
        </Button>
      </div>
    </section>
  );
};

export default Banner;
