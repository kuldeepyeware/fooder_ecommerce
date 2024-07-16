"use client";

import { useRecoilState } from "recoil";
import { cartItemAtom } from "../../lib/store/atoms/cartItems";
import { useEffect, useRef } from "react";
import MobileNavContent from "./MobileNavContent";
import NavContent from "./NavContent";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [cart, setCart] = useRecoilState(cartItemAtom);
  const isInitialized = useRef(false);
  const session = useSession();

  useEffect(() => {
    if (!isInitialized.current) {
      const storedCart = localStorage.getItem("checkout_Cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      isInitialized.current = true;
    } else {
      localStorage.setItem("checkout_Cart", JSON.stringify(cart));
    }
  }, [cart, setCart]);

  return (
    <nav className='w-full fixed bg-white z-10'>
      <NavContent cart={cart} setCart={setCart} session={session.data} />
      <MobileNavContent cart={cart} setCart={setCart} session={session.data} />
    </nav>
  );
};

export default Navbar;
