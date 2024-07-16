import Image from "next/image";
import { getCategories } from "../../data/category";

const BrowseRange = async () => {
  const data = await getCategories();

  return (
    <section className='flex flex-col justify-center'>
      <div className=' text-center mt-[50px]'>
        <h2 className=' font-bold text-[32px] leading-[48px]'>
          Browse The Range
        </h2>
        <p className='text-[20px] text-[#666666] mx-3'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className='flex justify-center md:flex-nowrap gap-4 flex-wrap mt-[54px]'>
        {data?.map((item, index) => (
          <div
            key={index}
            className='text-center flex flex-col gap-[20px] mx-5 mt-4'>
            <Image
              src={item.posterImage}
              alt='category image'
              width={1000}
              height={1000}
              className='md:h-[480px] md:w-[381px] h-[400px] w-[400px] rounded-[10px] object-cover'
            />
            <p className=' font-semibold text-[24px]'>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseRange;
