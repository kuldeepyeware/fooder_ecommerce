import { atom } from "recoil";

export interface CartItem {
  id: string;
  quantity: number;
  image: string;
  title: string;
  price: number;
}

export interface Cart {
  currency: string;
  item_count: number;
  items: CartItem[];
  items_subtotal_price: number;
  total_price: number;
}

export const cartItemAtom = atom<Cart>({
  key: "cartItemAtom",
  default: {
    currency: "INR",
    item_count: 0,
    items: [],
    items_subtotal_price: 0,
    total_price: 0,
  },
});
