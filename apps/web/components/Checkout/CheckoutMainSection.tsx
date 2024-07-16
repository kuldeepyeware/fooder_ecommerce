/* eslint-disable turbo/no-undeclared-env-vars */
"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  RadioGroup,
  RadioGroupItem,
  zodResolver,
  reactForm,
  z,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  useToast,
} from "@repo/ui/components";
import { Plus } from "@repo/ui/icons";
import FormSuccess from "../Form/formSuccess";
import FormError from "../Form/formError";
import { useEffect, useRef, useState, useTransition } from "react";
import { Country, State, City, ICountry, IState } from "country-state-city";
import { addressFormSchema } from "../../schemas/FormSchemas";
import { addAddress, fetchAddress } from "../../actions/address";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { cartItemAtom } from "../../lib/store/atoms/cartItems";
import Image from "next/image";
import { generateOrder, verifyPayment } from "../../actions/payment";
import { addOrder } from "../../actions/orderItem";
import { useRouter } from "next/navigation";

interface Address {
  id: string;
  userId: string;
  addressType: "HOME" | "OFFICE" | "PUBLIC";
  fullName: string;
  houseNo: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phoneNo: string;
  countryCode: string;
  country: string;
}

const CheckoutMainSection = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [retriveCountry, setRetriveCountry] = useState<ICountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [selectedCountryPhoneCode, setselectedCountryPhoneCode] = useState<
    string | undefined
  >("");
  const [selectedState, setSelectedState] = useState<IState>();
  const [addresses, setAddresses] = useState<Address[] | undefined>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | undefined
  >("");
  const [cart, setCart] = useRecoilState(cartItemAtom);
  const { toast } = useToast();
  const router = useRouter();

  const addAddressIntialization = useRef(false);

  const session = useSession();
  const userId = session?.data?.user?.id;
  const userName = session?.data?.user?.name;
  const userEmail = session?.data?.user?.email;

  const handleCollapsibleClick = () => {
    if (!addAddressIntialization.current) {
      setRetriveCountry(Country.getAllCountries());
      addAddressIntialization.current = true;
    }
  };

  const fetchUserAddresses = async (userId: string) => {
    const address = await fetchAddress(userId);
    if (address?.success) {
      setAddresses(address.data || []);
    } else {
      setAddresses([]);
    }
  };

  const handleAddressChange = (newAddressId: string) => {
    setSelectedAddressId(newAddressId);
  };

  const form = reactForm.useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      fullName: "",
      country: "",
      phoneNo: "",
      pinCode: "",
      houseNo: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      addressType: "HOME",
      countryCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof addressFormSchema>) {
    if (!userId) {
      setError("Login Required");
      return;
    }
    startTransition(() => {
      addAddress(values, userId).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          fetchUserAddresses(userId);
        }
      });
    });
  }

  const makePayment = async () => {
    if (!selectedAddressId) {
      toast({
        variant: "destructive",
        title: "Address Missing",
        description: "Please add/select your address",
      });
      return;
    }

    const amount = cart.total_price;
    const productId = cart.items.map((items) => items.id);
    const userId = session.data?.user?.id;
    const key = process.env.RAZORPAY_API_KEY_ID;

    if (!userId) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please Login/Register to proceed",
      });
      return;
    }

    if (!userName) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please Login/Register to proceed (Your name is missing)",
      });
      return;
    }

    const orderdetails = await generateOrder({
      amount,
      userId,
      productId,
      userName,
    });

    if (orderdetails.error) {
      toast({
        variant: "destructive",
        className: "fixed bottom-5 right-5 w-[300px]",
        title: orderdetails.error,
        description: "Please try again later!",
      });
      return;
    }

    const options = {
      key: key as string,
      name: "Fooder",
      currency: orderdetails.order?.currency as string,
      amount: orderdetails.order?.amount as number,
      order_id: orderdetails.order?.id as string,
      description: "Fooder Shopping Payment",
      image: "https://d3rts3x4c8sg1r.cloudfront.net/Fooder_logo.png",
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        const data = await verifyPayment(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );

        if (data?.success) {
          const data = await addOrder(
            userId,
            selectedAddressId,
            orderdetails.order?.currency,
            orderdetails.order?.amount,
            orderdetails.order?.id,
            response.razorpay_payment_id,
            cart.item_count,
            cart?.items,
            userName
          );

          if (data?.success) {
            router.push(`/paymentSuccess/${data.dataId}`);

            toast({
              variant: "cart",
              title: "Success",
              description: data?.success,
            });

            const defaultCart = {
              currency: "INR",
              item_count: 0,
              items: [],
              items_subtotal_price: 0,
              total_price: 0,
            };
            localStorage.setItem("checkout_Cart", JSON.stringify(defaultCart));
            setCart(defaultCart);
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong",
              description: data?.error,
            });
            return;
          }
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong",
            description: data?.error,
          });
          return;
        }
      },
      prefill: {
        name: userName as string,
        email: userEmail as string,
      },
      theme: {
        color: "#B88E2F",
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();

    paymentObject.on("payment.failed", function () {
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "Please try again. Contact support for help",
      });
    });
  };

  useEffect(() => {
    if (addresses) {
      if (addresses?.length > 0) {
        setSelectedAddressId(addresses[0]?.id);
      }
    }
  }, [addresses]);

  useEffect(() => {
    if (userId) {
      fetchUserAddresses(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedCountryPhoneCode) {
      form.setValue("countryCode", selectedCountryPhoneCode);
    }
  }, [selectedCountryPhoneCode, form]);

  return (
    <main className='flex flex-wrap justify-center items-start h-screen  mx-24'>
      {cart.items.length === 0 ? (
        <section className='w-full  flex flex-col items-center gap-5 justify-center'>
          <h1 className='text-2xl font-semibold'>No Item in carts</h1>
          <Button
            onClick={() => router.push("/")}
            className=' font-light h-full text-[20px] px-8 bg-[#B88E2F] text-white  hover:bg-[#B88E2F]/90 '>
            Continue Shopping
          </Button>
        </section>
      ) : (
        <>
          <section className='flex flex-col gap-8 md:w-1/2 '>
            <h1 className='font-bold text-2xl'>Shipping Information</h1>
            <div className='flex flex-col flex-wrap overflow-x-auto '>
              {addresses && (
                <>
                  {addresses?.length >= 1 ? (
                    <RadioGroup
                      value={selectedAddressId}
                      onValueChange={handleAddressChange}
                      defaultValue={selectedAddressId}
                      className='flex'>
                      {addresses?.map((item, index) => (
                        <div
                          className='flex gap-2 rounded-lg w-[335px] bg-slate-100 px-2 py-4'
                          key={`${item.id}-${index}`}>
                          <div className='flex items-start'>
                            <RadioGroupItem
                              value={item.id}
                              id={item.id}
                              className=' w-3 h-3 '
                            />
                          </div>

                          <Label htmlFor={item.id}>
                            <div className='flex flex-col gap-2'>
                              <div className='font-semibold'>
                                {item.fullName}
                              </div>
                              <div className='font-normal '>
                                {`${item.houseNo}, ${item.street}, ${item.landmark}, ${item.city}, ${item.state}, ${item.country}`}
                              </div>
                              <div className='font-normal '>{item.phoneNo}</div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className='text-lg'>
                      No saved address found - Create below
                    </div>
                  )}
                </>
              )}
            </div>
            <Collapsible>
              <CollapsibleTrigger
                className='flex border rounded-lg gap-1 p-2'
                onClick={handleCollapsibleClick}>
                <Plus strokeWidth={2} className='text-blue-500' />{" "}
                <span className=' text-blue-500 font-semibold'>
                  Add new address
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className='mt-7 flex justify-start '>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8  flex flex-col items-center '>
                    <FormField
                      control={form.control}
                      name='country'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-lg'>Country</FormLabel>
                          <FormControl>
                            <Select
                              disabled={isPending}
                              onValueChange={(value) => {
                                field.onChange(value);
                                const country = retriveCountry.find(
                                  (country) => country.name === value
                                );
                                setSelectedCountry(country);
                                setselectedCountryPhoneCode(country?.phonecode);
                              }}
                              defaultValue={field.value}>
                              <SelectTrigger className='w-[350px]  border-[#9F9F9F]'>
                                <SelectValue placeholder='Select a Country' />
                              </SelectTrigger>
                              <SelectContent>
                                {retriveCountry.map((item, index) => (
                                  <SelectItem
                                    value={item.name}
                                    key={item.isoCode || index}>
                                    {`${item.flag} ${item.name}`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='fullName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-lg'>
                            Full name (First and Last name)
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder='John Doe'
                              className='w-[350px]  border-[#9F9F9F]'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='flex flex-col items-start justify-center gap-2 max-w-[350px]'>
                      <div>
                        <FormLabel className='text-lg'>Phone Number</FormLabel>
                      </div>
                      <div className='flex gap-2'>
                        <FormField
                          control={form.control}
                          name='countryCode'
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select
                                  disabled={isPending}
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    setselectedCountryPhoneCode(value);
                                  }}
                                  value={field.value || ""}>
                                  <SelectTrigger className='w-[76px]  border-[#9F9F9F]'>
                                    <SelectValue placeholder='Select a Country Mobile Code' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from(
                                      new Set(
                                        retriveCountry.map(
                                          (item) => item.phonecode
                                        )
                                      )
                                    ).map((phonecode) => {
                                      const country = retriveCountry.find(
                                        (item) => item.phonecode === phonecode
                                      );
                                      return (
                                        <SelectItem
                                          value={phonecode}
                                          key={`${country?.currency}-${phonecode}`}>
                                          {"+"}
                                          {phonecode}
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='phoneNo'
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={isPending}
                                  type='number'
                                  pattern='[0-9]*'
                                  inputMode='numeric'
                                  className='w-[266px]  border-[#9F9F9F]'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name='pinCode'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-lg'>Pincode</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder='6 digits [0-9] PIN code'
                              className='w-[350px] border-[#9F9F9F]'
                              type='number'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='houseNo'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-lg'>
                            Flat, House no, Building, Company
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              className='w-[350px] border-[#9F9F9F]'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='street'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-lg'>
                            Area, Street, Sector, Village
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              className='w-[350px] border-[#9F9F9F]'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='landmark'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-lg'>Landmark</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder='E.g near apollo hospital'
                              className='w-[350px] border-[#9F9F9F]'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='flex gap-2 '>
                      <FormField
                        control={form.control}
                        name='state'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-lg'>State</FormLabel>
                            <FormControl>
                              <Select
                                disabled={isPending}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  const state = State.getStatesOfCountry(
                                    selectedCountry?.isoCode
                                  ).find((state) => state.name === value);
                                  setSelectedState(state);
                                }}
                                defaultValue={field.value}>
                                <SelectTrigger className='w-[170px]  border-[#9F9F9F]'>
                                  <SelectValue placeholder='Select a State' />
                                </SelectTrigger>
                                <SelectContent>
                                  {State.getStatesOfCountry(
                                    selectedCountry?.isoCode
                                  ).map((item) => (
                                    <SelectItem
                                      value={item.name}
                                      key={item.isoCode}>
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='city'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-lg'>City</FormLabel>
                            <FormControl>
                              <Select
                                disabled={isPending}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                }}
                                defaultValue={field.value}>
                                <SelectTrigger className='w-[170px]  border-[#9F9F9F]'>
                                  <SelectValue placeholder='Select a City' />
                                </SelectTrigger>
                                <SelectContent>
                                  {City.getCitiesOfState(
                                    selectedCountry?.isoCode as string,
                                    selectedState?.isoCode as string
                                  ).map((item, index) => (
                                    <SelectItem
                                      value={item.name}
                                      key={`${item.longitude}-${index}`}>
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name='addressType'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-lg'>
                            Address Type
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className='flex w-[350px] gap-8'>
                              <div className='flex items-center justify-center gap-2'>
                                <RadioGroupItem value='HOME' />
                                <Label className='text-base'>Home</Label>
                              </div>
                              <div className='flex items-center justify-center gap-2'>
                                <RadioGroupItem value='OFFICE' />
                                <Label className='text-base'>Office</Label>
                              </div>
                              <div className='flex items-center justify-center gap-2'>
                                <RadioGroupItem value='PUBLIC' />
                                <Label className='text-base'>Public</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='w-[350px]'>
                      <FormSuccess message={success} />
                      <FormError message={error} />
                    </div>

                    <Button
                      type='submit'
                      disabled={isPending}
                      className=' font-light h-full text-[20px] px-8 bg-[#B88E2F] text-white  hover:bg-[#B88E2F]/90 '>
                      Add
                    </Button>
                  </form>
                </Form>
              </CollapsibleContent>
            </Collapsible>
          </section>
          <section className=' flex flex-col items-center gap-8 md:w-1/2 px-5 min-w-[350px] '>
            <h2 className='font-semibold text-xl min-w-[350px] '>
              Items in cart
            </h2>
            <div className='flex flex-col gap-2'>
              {cart.items.map((item, key) => (
                <div
                  className='flex gap-2 w-full min-w-[350px]'
                  key={`${item.id}-${key}`}>
                  <Image
                    src={item.image}
                    alt=''
                    height={1000}
                    width={1000}
                    className='h-[90px] w-[90px] align-top max-w-[90px]'
                  />
                  <div className='flex flex-col gap-1 md:w-full max-w-[350px]'>
                    <div className=' text-start  '>{item.title}</div>
                    <div className='border-[#D9D9D9] border-t  w-full'></div>
                    <div>Quantity: x {item.quantity}</div>
                    <div className='border-[#D9D9D9] border-t  w-full'></div>
                    <div className=' text-slate-500'>
                      Total: &#8377;{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='w-[350px] '>
              <h2 className='font-semibold text-xl '>Summary</h2>
              <div className='flex justify-between mt-4'>
                <span>Total Amount:</span>
                <span className='font-bold'>&#8377;{cart.total_price}</span>
              </div>
              <div className='border-[#D9D9D9] border-t  w-full'></div>
            </div>
            <div className='w-[350px] flex justify-end gap-2'>
              <Button
                onClick={() => router.back()}
                className=' font-medium h-full text-[15px] px-8 bg-white border text-black  hover:bg-black/10 '>
                Back
              </Button>
              <Button
                onClick={makePayment}
                className=' font-medium h-full text-[15px] px-8 bg-[#B88E2F] text-white  hover:bg-[#B88E2F]/90 '>
                Checkout
              </Button>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default CheckoutMainSection;
