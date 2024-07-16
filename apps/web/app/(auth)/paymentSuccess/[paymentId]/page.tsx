import Link from "next/link";
import { getOrderItem } from "../../../../data/order";

const PaymentSuccessPage = async ({
  params,
}: {
  params: { paymentId: string };
}) => {
  const data = await getOrderItem(params.paymentId);

  function formatDate(date: Date | undefined) {
    const formattedDate = date?.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = date?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime}`;
  }

  return (
    <div className='flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-md text-center'>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
          Payment Successful
        </h1>
        <p className='mt-4 text-muted-foreground'>
          Your payment was processed successfully
        </p>
        <div className='mt-6 space-y-4'>
          <div className='rounded-md border bg-muted p-4'>
            <p className='text-sm font-medium text-foreground'>
              Payment ID: <span className='font-bold'>{data?.paymentId}</span>
            </p>
            <div className='mt-2 flex items-center justify-between'>
              <p className='text-sm text-muted-foreground'>Amount Paid</p>
              <p className='text-lg font-bold'>
                &#8377;{Number(data?.amountPaidByCustomer) / 100}
              </p>
            </div>
            <div className='mt-2 flex items-center justify-between'>
              <p className='text-sm text-muted-foreground'>Date &amp; Time</p>
              <p className='text-sm'>{formatDate(data?.createdAt)}</p>
            </div>
          </div>
          <Link
            href='/'
            className='inline-flex w-full items-center justify-center rounded-md bg-[#B88E2F] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#B88E2F]/90 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2'>
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
