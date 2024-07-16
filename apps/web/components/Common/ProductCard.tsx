"use client";

import { Button, useToast } from "@repo/ui/components";
import Image from "next/image";
import Link from "next/link";
import ReviewStar from "./ReviewStar";
import { useRecoilState } from "recoil";
import { CartItem, cartItemAtom } from "../../lib/store/atoms/cartItems";

interface IProps {
  id: string;
  title: string;
  oldPrice?: string | null;
  latestPrice: string;
  reviews: review[];
  images: image[];
}

interface review {
  reviewStars: number;
}

interface image {
  url: string;
}

const ProductCard = ({
  id,
  title,
  oldPrice,
  latestPrice,
  reviews,
  images,
}: IProps) => {
  const imageUrl = images && images.length > 0 && images[0]?.url;

  const [cart, setCart] = useRecoilState(cartItemAtom);
  const { toast } = useToast();

  const addToCart = () => {
    const newItem = {
      id: id,
      quantity: 1,
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
        item_count: cart.item_count + newItem.quantity,
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

    toast({
      variant: "cart",
      description: "Product added to cart successfully",
    });
  };

  return (
    <div className='bg-[#F4F5F7] flex flex-col justify-between max-w-[285px]  '>
      <Link href={`/shop/${id}`}>
        <div>
          <>
            <Image
              src={imageUrl as string}
              alt=''
              height={1000}
              width={1000}
              className='w-[285px] h-[285px] '
            />
          </>
          <div className='text-[16px] font-semibold  mx-[10px] mt-2'>
            {title}
          </div>
          <div className='flex mx-[9px] gap-x-[2px]  items-center mt-1 mb-3 '>
            {reviews.length >= 1 ? (
              <>
                {" "}
                <ReviewStar reviews={reviews} />
                <div className='font-light text-sm'>({reviews?.length})</div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Link>
      <div>
        <div className='pl-[10px] flex bg-[#edecec] w-full'>
          <div className='w-2/4 min-h-[54px] flex flex-col justify-center'>
            {oldPrice && (
              <div className='text-[16px] text-[#B0B0B0] line-through '>
                &#8377;{oldPrice}
              </div>
            )}
            <div className='text-[20px] font-semibold'>
              &#8377;{latestPrice}
            </div>
          </div>
          <div className='w-2/4'>
            <Button
              onClick={addToCart}
              className='w-full h-full bg-[#B88E2F] text-white  hover:bg-[#B88E2F]/90 rounded-none'>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
