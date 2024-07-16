"use client";

import Link from "next/link";
import {
  CircleUserRound,
  Key,
  LogOut,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash,
  X,
} from "@repo/ui/icons";
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Input,
  useToast,
  DropdownMenuLabel,
} from "@repo/ui/components";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Cart, CartItem } from "../../lib/store/atoms/cartItems";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { searchProducts } from "../../actions/search";

interface CartProps {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  session: Session | null;
}

export interface Product {
  id: string;
  title: string;
  latestPrice: string;
  images: {
    url: string;
  }[];
}

const NavContent: React.FC<CartProps> = ({ cart, setCart, session }) => {
  const router = useRouter();
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

      return updatedCart;
    });
  };

  return (
    <div className='md:flex justify-between h-[80px]  hidden items-center  px-10'>
      <Link href={"/"} className='flex justify-center items-center '>
        <div className='flex justify-center items-center gap-2  max-h-[50px]'>
          <div>
            <Image
              src={"https://d3rts3x4c8sg1r.cloudfront.net/Fooder_logo.png"}
              alt=''
              height={100}
              width={100}
              className='h-12 w-12 rounded-lg'
            />
          </div>
          <h1 className='text-xl font-medium'>Fooder</h1>
        </div>
      </Link>
      <div className='flex gap-x-14 justify-center items-center -mr-[60px]'>
        <Link href={"/shop"}>
          <div className='hover:text-[#B88E2F]'>Shop</div>
        </Link>
        <Link href={"/about"}>
          <div className='hover:text-[#B88E2F]'>Our Story</div>
        </Link>
        <Link href={"/contact"}>
          <div className='hover:text-[#B88E2F]'>Connect</div>
        </Link>
      </div>
      <div className='flex justify-center  items-center gap-10'>
        <div className='relative'>
          <Search
            size={32}
            strokeWidth={1}
            className='hover:text-[#B88E2F] cursor-pointer'
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          />
          {isSearchVisible && (
            <div className='fixed top-1  left-1/2 transform -translate-x-1/2  bg-white p-4 w-11/12 max-w-3xl z-50 shadow-lg rounded-lg'>
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
                <ul className='mt-4 max-h-96 overflow-y-auto'>
                  {searchResults.map((product) => (
                    <li key={product.id} className='mb-2 flex items-center'>
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
        <div className='flex justify-center items-center'>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <span className='flex  hover:text-[#B88E2F]'>
                <ShoppingCart
                  size={30}
                  strokeWidth={1}
                  className='cursor-pointer'
                />

                {cart.items.length >= 1 && (
                  <div className='absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-[13px] end-[100px] '>
                    {cart.items.length}
                  </div>
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
                          <div className='font-bold text-lg'>
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
                    {!session?.user && (
                      <>
                        <div>Have an account?</div>
                        <div>
                          <span className='underline'>
                            <Link
                              href={"/account/login"}
                              onClick={() => setIsSheetOpen(false)}>
                              Log in
                            </Link>
                          </span>
                          to check out faster.
                        </div>
                      </>
                    )}
                  </SheetDescription>
                )}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Avatar className='w-[32px] h-[32px] cursor-pointer'>
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className='bg-white'>
                  <CircleUserRound
                    size={30}
                    strokeWidth={1}
                    className='hover:text-[#B88E2F] cursor-pointer'
                  />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-2 mt-6  shadow-2xl'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              {session?.user ? (
                <>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <Link href={"/account/login"}>
                  <DropdownMenuItem>
                    <Key className='mr-2 h-4 w-4' />
                    <span>Log in</span>
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavContent;
