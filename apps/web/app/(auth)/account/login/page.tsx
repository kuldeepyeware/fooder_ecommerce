"use client";

import {
  Input,
  zodResolver,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  reactForm,
  z,
} from "@repo/ui/components";
import { useState, useTransition } from "react";
import { loginFormSchema } from "../../../../schemas/FormSchemas";
import { login } from "../../../../actions/login";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../../routes";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FormSuccess from "../../../../components/Form/formSuccess";
import FormError from "../../../../components/Form/formError";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with diffrent provider!"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = reactForm.useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  const onClick = (provider: "google" | "twitter" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <main className='h-screen flex flex-col justify-center items-center w-full '>
      <h1 className=' font-semibold text-3xl'>Login</h1>
      <div className='flex items-center gap-5 mt-7'>
        <Button
          className='h-full flex bg-red-500 hover:bg-red-500/90 cursor-pointer p-1 rounded-lg '
          onClick={() => onClick("google")}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#ffffff'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-brand-google'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z' />
          </svg>
        </Button>
        <Button
          className='flex h-full bg-blue-900 hover:bg-blue-900/90 cursor-pointer p-1 rounded-lg '
          onClick={() => onClick("facebook")}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#ffffff'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
          </svg>
        </Button>
      </div>
      <div className='mt-5'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8  flex flex-col items-center'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder='johndoe@gmail.com'
                      className='w-[450px]  border-[#9F9F9F]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder='********'
                      className='w-[450px] border-[#9F9F9F]'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />

                  <Link
                    className='flex justify-start w-full text-sm hover:underline text-[#B88E2F] hover:text-[#B88E2F]/80 '
                    href={"/account/reset"}>
                    Forgot Your Password?
                  </Link>
                </FormItem>
              )}
            />

            <FormSuccess message={success} />
            <FormError message={error || urlError} />

            <Button
              type='submit'
              disabled={isPending}
              className=' font-light h-full text-[20px] px-8 bg-[#B88E2F] text-white  hover:bg-[#B88E2F]/90 rounded-none'>
              Sign In
            </Button>
          </form>
        </Form>
      </div>

      <Link
        className=' mt-5 text-sm hover:underline text-[#B88E2F] hover:text-[#B88E2F]/80 '
        href={"/account/register"}>
        Create Account
      </Link>
    </main>
  );
};

export default LoginPage;
