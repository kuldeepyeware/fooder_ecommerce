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
import { resetPasswordSchema } from "../../schemas/FormSchemas";
import { reset } from "../../actions/reset";
import Link from "next/link";
import FormError from "../Form/formError";
import FormSuccess from "../Form/formSuccess";

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = reactForm.useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <main className='h-screen flex  flex-col  justify-center items-center w-full '>
      <h1 className=' font-semibold text-3xl'>Forgot your password?</h1>
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
                      className='md:w-[450px] w-[300px]  border-[#9F9F9F]'
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
              Send reset email
            </Button>
          </form>
        </Form>
      </div>

      <Link
        className=' mt-5 text-sm hover:underline text-[#B88E2F] hover:text-[#B88E2F]/80 '
        href={"/account/login"}>
        Back to login
      </Link>
    </main>
  );
};

export default ResetForm;
