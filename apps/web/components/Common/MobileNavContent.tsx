"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetFooter,
  Button,
  useToast,
  Input,
} from "@repo/ui/components";
import {
  Search,
  ShoppingCart,
  Menu,
  ShoppingBag,
  BookOpen,
  Link as IconLink,
  Trash,
  Minus,
  Plus,
  X,
  LogOut,
} from "@repo/ui/icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cart, CartItem } from "../../lib/store/atoms/cartItems";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { Product } from "./NavContent";
import { searchProducts } from "../../actions/search";
import { signOut } from "next-auth/react";

interface CartProps {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  session: Session | null;
}

const MobileNavContent: React.FC<CartProps> = ({ cart, setCart, session }) => {
  const router = useRouter();
  const [isLeftSheetOpen, setIsLeftSheetOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[] | []>([]);
  const { toast } = useToast();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchProducts(query);

      if (results.success && results.products) {
        setSearchResults(results.products);
      } else {
        setSearchResults([]);
        toast({
          variant: "destructive",
          title: "Search Error Occurred",
          description: results.error || "Please try again later!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search Error Occurred",
        description: "Please try again later!",
      });
    }
  };

  useEffect(() => {
    if (!isSearchVisible) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isSearchVisible]);

  const increseCartItem = (item: CartItem) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        item_count: prevCart.item_count + 1,
        items_subtotal_price:
          Number(prevCart.items_subtotal_price) + Number(item.price),
        total_price: Number(prevCart.items_subtotal_price) + Number(item.price),
      };

      localStorage.setItem("checkout_Cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decreseCartItem = (item: CartItem) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((cartItem) => {
        if (cartItem.id === item.id && cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });

      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        item_count:
          item.quantity > 1 ? prevCart.item_count - 1 : prevCart.item_count,
        items_subtotal_price:
          item.quantity > 1
            ? Number(prevCart.items_subtotal_price) - Number(item.price)
            : Number(prevCart.items_subtotal_price),
        total_price:
          item.quantity > 1
            ? Number(prevCart.items_subtotal_price) - Number(item.price)
            : Number(prevCart.items_subtotal_price),
      };

      localStorage.setItem("checkout_Cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const deleteCartItem = (item: CartItem) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (cartItem) => cartItem.id !== item.id
      );

      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        item_count: prevCart.item_count - item.quantity,
        items_subtotal_price:
          prevCart.items_subtotal_price - item.price * item.quantity,
        total_price: prevCart.items_subtotal_price - item.price * item.quantity,
      };

      localStorage.setItem("checkout_Cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className='flex justify-between h-[70px] md:hidden   items-center px-7'>
      <div className='flex items-center'>
        <Sheet open={isLeftSheetOpen} onOpenChange={setIsLeftSheetOpen}>
          <SheetTrigger>
            <Menu size={27} strokeWidth={1} />
          </SheetTrigger>
          <SheetContent side='left' className='w-[350px]'>
            <SheetHeader>
              <SheetTitle>
                <Link href={"/"} onClick={() => setIsLeftSheetOpen(false)}>
                  <span className='text-2xl font-medium'>Fooder</span>
                </Link>
              </SheetTitle>
              <SheetDescription>
                <Link
                  href={"/shop"}
                  className='w-full h-20  rounded flex justify-start items-center gap-2 font-light text-black  text-2xl hover:text-[#B88E2F]'
                  onClick={() => setIsLeftSheetOpen(false)}>
                  <span>
                    <ShoppingBag size={30} strokeWidth={1} />
                  </span>
                  Shop
                </Link>
                <Link
                  href={"/about"}
                  className='w-full h-20  flex justify-start items-center gap-2 font-light text-black  text-2xl hover:text-[#B88E2F]'
                  onClick={() => setIsLeftSheetOpen(false)}>
                  <span>
                    <BookOpen size={30} strokeWidth={1} />
                  </span>
                  Our Story
                </Link>
                <Link
                  href={"/contact"}
                  className='w-full h-20  flex justify-start items-center gap-2 font-light text-black text-2xl hover:text-[#B88E2F]'
                  onClick={() => setIsLeftSheetOpen(false)}>
                  <span>
                    <IconLink size={30} strokeWidth={1} />
                  </span>
                  Connect
                </Link>
                {session && (
                  <div
                    onClick={() => signOut()}
                    className='w-full cursor-pointer h-20  flex justify-start items-center gap-2 font-light text-black text-2xl hover:text-[#B88E2F]'>
                    <LogOut size={30} strokeWidth={1} />
                    <span>Log Out</span>
                  </div>
                )}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className='flex items-center ml-8 '>
        <Link href={"/"}>
          <h1 className='text-xl font-medium'>Fooder</h1>
        </Link>
      </div>
      <div className='flex justify-center items-center gap-4'>
        <div>
          <Search
            size={27}
            strokeWidth={1}
            className='hover:text-[#B88E2F] cursor-pointer'
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          />
        </div>

        <div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <span className='flex hover:text-[#B88E2F]'>
                <ShoppingCart
                  size={30}
                  strokeWidth={1}
                  className='cursor-pointer'
                />

                {cart.items.length >= 1 && (
                  <span className='absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-[10px] end-[15px] '>
                    {cart.items.length}
                  </span>
                )}
              </span>
            </SheetTrigger>
            <SheetContent className='overflow-y-auto'>
              <SheetHeader>
                <SheetTitle className='text-2xl '>Shopping Cart</SheetTitle>

                {cart.items.length >= 1 ? (
                  <>
                    <SheetDescription>
                      {cart?.items.map((item, index) => (
                        <div className='flex p-3  border-b-2' key={index}>
                          <Image
                            src={item.image}
                            alt=''
                            height={1000}
                            width={1000}
                            className='h-[90px] w-[90px] align-top max-w-[90px]'
                          />
                          <div className='px-2 text-black w-[180px] text-start'>
                            <div className='break-words text-wrap max-w-[180px]'>
                              {item.title}
                            </div>
                            <div>&#8377;{item.price}</div>
                            <div className=' mt-7 flex justify-between items-center  border  max-w-20 font-normal text-center'>
                              <div className='bg-[#FFF3E3]  '>
                                <Minus
                                  strokeWidth={1}
                                  className='cursor-pointer'
                                  onClick={() => decreseCartItem(item)}
                                />
                              </div>
                              <span>{item.quantity}</span>
                              <div className='bg-[#d3a740]  '>
                                <Plus
                                  strokeWidth={1}
                                  className='cursor-pointer'
                                  onClick={() => increseCartItem(item)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-col justify-between text-black items-end'>
                            <Trash
                              className='hover:text-red-500 cursor-pointer'
                              strokeWidth={1}
                              onClick={() => deleteCartItem(item)}
                              size={20}
                            />
                            <div className=' font-bold text-lg'>
                              &#8377;{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </SheetDescription>
                    <SheetFooter className='mt-5'>
                      <div className='w-full h-full flex justify-between items-center mt-4'>
                        <div>
                          <div className='font-bold text-lg text-start w-full'>
                            &#8377;{cart.total_price}
                          </div>
                          <div>Inclusive of all taxes</div>
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              router.push("/checkout");
                              setIsSheetOpen(false);
                            }}
                            className='bg-[#B88E2F] hover:bg-[#B88E2F]/90 rounded-none'>
                            Confirm Order
                          </Button>
                        </div>
                      </div>
                    </SheetFooter>
                  </>
                ) : (
                  <SheetDescription className='flex h-[90vh] gap-y-4 flex-col justify-center items-center'>
                    <span className='text-black text-xl font-semibold'>
                      Your cart is empty
                    </span>
                  </SheetDescription>
                )}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        {isSearchVisible && (
          <div className='fixed top-0 left-0 w-full max-h-[225px] bg-white z-50 p-4'>
            <div className='relative'>
              <Input
                type='text'
                value={searchQuery}
                onChange={handleSearch}
                placeholder='Search products...'
                className='w-full p-2 border rounded pr-10'
              />
              <X
                size={24}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-red-500'
                onClick={() => setIsSearchVisible(false)}
              />
            </div>
            {searchResults.length > 0 && (
              <ul className='mt-4  max-h-[150px] overflow-y-auto'>
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    className='mb-2 h-full flex items-center'>
                    <Link
                      href={`/shop/${product.id}`}
                      onClick={() => setIsSearchVisible(false)}
                      className='flex items-center w-full hover:bg-gray-100 p-2 rounded'>
                      <Image
                        src={product?.images[0]?.url || "/placeholder.jpg"}
                        alt={product.title}
                        width={50}
                        height={50}
                        className='mr-4 object-cover'
                      />
                      <div>
                        <div className='font-semibold'>{product.title}</div>
                        <div className='text-sm text-gray-600'>
                          &#8377;{product.latestPrice}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavContent;
