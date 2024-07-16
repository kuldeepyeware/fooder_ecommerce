import { PuffLoader } from "react-spinners";

const PaymentSuccessLoading = () => {
  return (
    <main className='w-screen h-screen flex justify-center items-center'>
      <PuffLoader color='#000000' />
    </main>
  );
};

export default PaymentSuccessLoading;
