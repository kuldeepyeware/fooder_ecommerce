import Link from "next/link";

const AuthErrorPage = () => {
  return (
    <div className='flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-md text-center'>
        <div className='mx-auto h-12 w-12 text-primary' />
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
          Oops, something went wrong!
        </h1>
        <p className='mt-4 text-muted-foreground'>
          We're sorry, but an unexpected error has occurred. Please try again
          later or contact support if the issue persists.
        </p>
        <div className='mt-6'>
          <Link
            href='/account/login'
            className='inline-flex items-center rounded-md bg-[#B88E2F] px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-[#B88E2F]/90 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2'>
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
