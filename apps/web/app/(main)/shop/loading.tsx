import { Skeleton } from "@repo/ui/components";

const ShopPageSkeleton = () => {
  return (
    <main className='h-full w-full pt-20'>
      <section className='h-[200px] w-full bg-gray-200 flex justify-center items-center flex-col'>
        <Skeleton className='h-[48px] w-[150px] mb-4' />
        <Skeleton className='h-[24px] w-[200px]' />
      </section>

      <section className='flex flex-col items-center'>
        <div className='flex justify-center gap-4 my-8'>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className='h-[60px] w-[60px] rounded-full' />
          ))}
        </div>

        <div className='flex h-full flex-wrap gap-5 justify-center mx-7 mb-5'>
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className='w-[285px] h-[385px]  rounded-lg' />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ShopPageSkeleton;
