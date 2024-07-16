"use client";

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useToast,
} from "@repo/ui/components";
import { Minus, Plus } from "@repo/ui/icons";
import Image from "next/image";
import ReviewStar from "../../Common/ReviewStar";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CartItem, cartItemAtom } from "../../../lib/store/atoms/cartItems";

interface IProps {
  id: string;
  title: string;
  oldPrice: string;
  latestPrice: string;
  shortDescription: string;
  reviews: review[];
  images: image[];
}

interface review {
  reviewStars: number;
}

interface image {
  url: string;
}

const ProductMainSection = ({
  id,
  title,
  oldPrice,
  latestPrice,
  shortDescription,
  reviews,
  images,
}: IProps) => {
  const [activeImage, setActiveImage] = useState<string | undefined>(
    images && images.length > 0 ? images[0]?.url : undefined
  );
  const [count, setCount] = useState(1);
  const [cart, setCart] = useRecoilState(cartItemAtom);
  const { toast } = useToast();

  const addToCart = () => {
    const newItem = {
      id: id,
      quantity: count,
      image:
        images && images.length > 0 && images[0]?.url ? images[0]?.url : "",
      title: title,
      price: parseFloat(latestPrice),
    };

    const existingItemIndex = cart.items.findIndex(
      (item: CartItem) => item.id === newItem.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = {
        ...cart,
        items: cart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        ),
        items_subtotal_price:
          cart.items_subtotal_price + newItem.quantity * Number(newItem.price),
      };
      updatedCart.total_price = updatedCart.items_subtotal_price;
      setCart(updatedCart);
    } else {
      const updatedCart = {
        ...cart,
        items: [...cart.items, newItem],
        items_subtotal_price:
          cart.items_subtotal_price + newItem.quantity * Number(newItem.price),
        item_count: cart.item_count + newItem.quantity,
      };
      updatedCart.total_price = updatedCart.items_subtotal_price;
      setCart(updatedCart);
    }

    localStorage.setItem("checkout_Cart", JSON.stringify(cart));

    toast({
      variant: "cart",
      description: "Product added to cart successfully",
    });
  };

  return (
    <section className='py-[35px] md:px-[99px] px-[40px] flex flex-wrap '>
      <div className='lg:w-2/4 w-full flex justify-center items-center h-full flex-col'>
        <Image
          src={activeImage || ""}
          alt=''
          height={1000}
          width={1000}
          className='md:w-[500px] md:h-[500px] w-[400px] h-[400px] rounded-lg'
        />
        <div className='mt-5 flex justify-center items-center max-w-[500px]'>
          {images && (
            <Carousel className='md:w-[480px] w-[330px]'>
              <CarouselContent
                className={`${images.length > 4 ? "" : "flex justify-center items-center"}`}>
                {images?.map((item, index) => (
                  <CarouselItem key={index} className='md:basis-1/4 basis-1/4'>
                    <Image
                      src={item.url || ""}
                      alt=''
                      height={1000}
                      width={1000}
                      onClick={() => setActiveImage(item.url)}
                      className={`h-[80px] w-[80px] md:h-[110px] md:w-[110px] rounded-lg cursor-pointer ${activeImage === item.url ? " border border-black" : ""} `}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </div>
      <div className='lg:w-2/4 mt-6 lg:mt-0 w-full h-full '>
        <div className='text-[42px]'>{title}</div>
        <div className='flex gap-8'>
          <div className='text-[24px]'>&#8377;{latestPrice}</div>
          {oldPrice && (
            <div className='text-[24px] text-[#9F9F9F] line-through'>
              &#8377;{oldPrice}
            </div>
          )}
        </div>
        <div className='flex items-center gap-4 mt-2'>
          {reviews.length >= 1 && (
            <>
              {reviews && <ReviewStar reviews={reviews} />}
              <span>|</span>
              <div className='text-[#9F9F9F]'>
                {reviews?.length} Customer Review
              </div>
            </>
          )}
        </div>
        <div className='break-words mt-5 w-full'>{shortDescription}</div>
        <div className='flex md:mt-[113px] mt-[50px]  gap-7'>
          <div className=' flex px-2 justify-between items-center w-[123px] h-[64px] border border-black rounded-xl font-normal text-center'>
            <Button
              className='bg-white px-2 hover:bg-white'
              onClick={() =>
                setCount((prevCount) => Math.max(1, prevCount - 1))
              }>
              <Minus strokeWidth={2} color='black' className='cursor-pointer' />
            </Button>
            <span>{count}</span>
            <Button
              className='bg-white px-2 hover:bg-white'
              onClick={() => setCount((prevCount) => prevCount + 1)}>
              <Plus strokeWidth={2} color='black' className='cursor-pointer' />
            </Button>
          </div>
          <Button
            variant={"outline"}
            onClick={addToCart}
            className='text-[20px] h-[64px] w-[215px] border border-black rounded-xl font-normal'>
            Add To Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductMainSection;
