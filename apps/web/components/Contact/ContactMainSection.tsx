"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  reactForm,
  Textarea,
  z,
  zodResolver,
} from "@repo/ui/components";
import { useState, useTransition } from "react";
import { queryFormSchema } from "../../schemas/FormSchemas";
import FormSuccess from "../Form/formSuccess";
import FormError from "../Form/formError";
import { addQuery } from "../../actions/query";

const ContactMainSection = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = reactForm.useForm<z.infer<typeof queryFormSchema>>({
    resolver: zodResolver(queryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof queryFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      addQuery(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      });
      console.log(values);
    });
  };
  return (
    <section className='mt-[80px] w-full flex justify-center md:p-0 mb-5 px-10 flex-col '>
      <div className=''>
        <div className='text-[36px] font-semibold text-center'>
          Get In Touch With Us
        </div>
        <div className='text-[#9F9F9F] text-center mx-auto max-w-[644px]'>
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </div>
      </div>
      <div className='w-full flex flex-wrap lg:px-[191px] md:px-[100px] mt-[82px]'>
        <div className='md:w-2/4 w-full '>
          <div className='flex flex-col gap-5'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8  flex flex-col items-center'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xl'>Your name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder='abc'
                          className='md:w-[450px] w-[300px]  border-[#9F9F9F]'
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
                      <FormLabel className='text-xl'>
                        Your email address
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder='abc@example.com'
                          className='md:w-[450px] w-[300px] border-[#9F9F9F]'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='subject'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xl'>Subject</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder='Hi! i’d like to ask about'
                          className='md:w-[450px] w-[300px] border-[#9F9F9F]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xl'>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          className='md:w-[450px] w-[300px] border-[#9F9F9F]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='w-[450px]'>
                  <FormSuccess message={success} />
                  <FormError message={error} />
                </div>

                <Button
                  type='submit'
                  disabled={isPending}
                  className=' font-light h-full text-[20px] px-8 bg-[#B88E2F] text-white  hover:bg-[#B88E2F]/90 rounded-none'>
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className='md:w-2/4 md:pl-20 mt-5 md:mt-0 w-full flex flex-col gap-10'>
          <div>
            <div className='text-[24px] font-medium'>Address</div>
            <div>236 5th SE Avenue, New York NY10000, United States</div>
          </div>
          <div>
            <div className='text-[24px] font-medium'>Phone</div>
            <div>
              Mobile: +(84) 546-6789
              <br />
              Hotline: +(84) 456-6789
            </div>
          </div>
          <div>
            <div className='text-[24px] font-medium'>Working Time</div>
            <div>
              Monday-Friday: 9:00 - 22:00
              <br />
              Saturday-Sunday: 9:00 - 21:00
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMainSection;
