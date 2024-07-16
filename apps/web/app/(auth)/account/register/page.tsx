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
import Link from "next/link";
import { register } from "../../../../actions/register";
import { useState, useTransition } from "react";
import FormSuccess from "../../../../components/Form/formSuccess";
import FormError from "../../../../components/Form/formError";
import { registerFormSchema } from "../../../../schemas/FormSchemas";

const RegisterPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = reactForm.useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <main className='h-full flex flex-col justify-center items-center w-full pt-20'>
      <h1 className=' font-semibold text-3xl mt-7'>Create account</h1>
      <div className='mt-5'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8  flex flex-col items-center'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>First Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder='John'
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
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder='Doe'
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder='johndoe@gmail.com'
                      type='email'
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
                </FormItem>
              )}
            />

            <FormSuccess message={success} />
            <FormError message={error} />

            <Button
              type='submit'
              disabled={isPending}
              className=' font-light h-full text-[20px] px-8 bg-[#B88E2F] text-white  hover:bg-[#B88E2F]/90 rounded-none'>
              Create
            </Button>
          </form>
        </Form>
      </div>

      <div className=' mt-5 mb-5 text-sm underline text-[#B88E2F] hover:text-[#B88E2F]/80 '>
        <Link href={"/account/login"}>Login</Link>
      </div>
    </main>
  );
};

export default RegisterPage;
