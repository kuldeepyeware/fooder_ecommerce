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
import { newPasswordSchema } from "../../schemas/FormSchemas";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FormError from "../Form/formError";
import FormSuccess from "../Form/formSuccess";
import { newPassword } from "../../actions/newPassword";

const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = reactForm.useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <main className='h-screen flex  flex-col  justify-center items-center w-full '>
      <h1 className=' font-semibold text-3xl'>Enter a new password</h1>
      <div className='mt-5'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8  flex flex-col items-center'>
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
                      type='password'
                      className='w-[450px]  border-[#9F9F9F]'
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
              Reset Password
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

export default NewPasswordForm;
