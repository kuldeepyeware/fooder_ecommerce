import { Lock } from "@repo/ui/icons";
import Image from "next/image";

const CheckoutHeroSection = () => {
  return (
    <section className='h-[70px] w-full bg-[#eff2f2] md:px-[150px] px-10 justify-between flex items-center mb-10'>
      <div className='max-w-[170px] max-h-[60px] flex items-center '>
        <Image
          src={"https://d3rts3x4c8sg1r.cloudfront.net/Fooder_logo.png"}
          alt=''
          height={100}
          width={100}
          className='h-12 w-12 rounded-lg'
        />
      </div>
      <div className='text-2xl font-semibold'>Checkout</div>
      <div>
        <Lock size={40} />
      </div>
    </section>
  );
};

export default CheckoutHeroSection;
