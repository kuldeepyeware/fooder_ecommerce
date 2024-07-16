import { Skeleton } from "@repo/ui/components";

const ProductSkeletonPage = () => {
  return (
    <section className='pt-20 text-black'>
      <Skeleton className='h-[70px] w-full' />

      <div className='py-[35px] md:px-[99px] px-[40px] flex flex-wrap'>
        <div className='lg:w-2/4 w-full flex justify-center items-center h-full flex-col'>
          <Skeleton className='md:w-[500px] md:h-[500px] w-[400px] h-[400px] rounded-lg' />
          <div className='mt-5 flex justify-center items-center max-w-[500px]'>
            <Skeleton className='md:w-[480px] w-[330px] h-[110px]' />
          </div>
        </div>
        <div className='lg:w-2/4 mt-6 lg:mt-0 w-full h-full'>
          <Skeleton className='h-[50px] w-3/4 mb-4' />
          <Skeleton className='h-[30px] w-1/4 mb-2' />
          <Skeleton className='h-[20px] w-1/2 mb-4' />
          <Skeleton className='h-[100px] w-full mb-4' />
          <div className='flex md:mt-[113px] mt-[50px] gap-7'>
            <Skeleton className='w-[123px] h-[64px]' />
            <Skeleton className='w-[215px] h-[64px]' />
          </div>
        </div>
      </div>

      <Skeleton className='w-full h-[1px] mb-12' />
      <div className='px-[120px] mb-12'>
        <div className='flex gap-7 mb-9'>
          <Skeleton className='h-[40px] w-[150px]' />
          <Skeleton className='h-[40px] w-[200px]' />
          <Skeleton className='h-[40px] w-[150px]' />
        </div>
        <Skeleton className='h-[200px] w-full' />
      </div>

      <Skeleton className='w-full h-[1px] mb-12' />
      <div className='flex flex-col items-center mb-[30px]'>
        <Skeleton className='h-[40px] w-[300px] mb-8' />
        <div className='flex flex-wrap gap-5 justify-center mx-7 mt-[32px]'>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className='w-[270px] h-[400px]' />
          ))}
        </div>
        <Skeleton className='h-[50px] w-[200px] mt-8' />
      </div>
    </section>
  );
};

export default ProductSkeletonPage;
