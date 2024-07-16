import { Skeleton } from "@repo/ui/components";

const CheckoutPageSkeleton = () => {
  return (
    <main className='h-full w-full pt-20'>
      <section className='h-[70px] w-full bg-[#eff2f2] md:px-[150px] px-10 justify-between flex items-center mb-10'>
        <Skeleton className='h-12 w-12 rounded-lg' />
        <Skeleton className='h-8 w-32' />
        <Skeleton className='h-10 w-10 rounded-full' />
      </section>

      <main className='flex flex-wrap justify-center items-start h-screen mx-24'>
        <section className='flex flex-col gap-8 md:w-1/2'>
          <Skeleton className='h-8 w-48 mb-4' />
          <div className='flex flex-col gap-4'>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className='h-24 w-[335px] rounded-lg' />
            ))}
          </div>
          <Skeleton className='h-10 w-40' />
        </section>

        <section className='flex flex-col items-center gap-8 md:w-1/2 px-5 min-w-[350px]'>
          <Skeleton className='h-6 w-32 mb-4' />
          <div className='flex flex-col gap-4 w-full'>
            {[...Array(3)].map((_, index) => (
              <div key={index} className='flex gap-2 w-full min-w-[350px]'>
                <Skeleton className='h-[90px] w-[90px]' />
                <div className='flex flex-col gap-2 w-full'>
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-1 w-full' />
                  <Skeleton className='h-4 w-1/4' />
                  <Skeleton className='h-1 w-full' />
                  <Skeleton className='h-4 w-1/2' />
                </div>
              </div>
            ))}
          </div>
          <div className='w-[350px]'>
            <Skeleton className='h-6 w-24 mb-4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-1 w-full mt-2' />
          </div>
          <div className='w-[350px] flex justify-end gap-2'>
            <Skeleton className='h-10 w-24' />
            <Skeleton className='h-10 w-24' />
          </div>
        </section>
      </main>
    </main>
  );
};

export default CheckoutPageSkeleton;
