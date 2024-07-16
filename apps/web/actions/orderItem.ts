"use server";

import prisma, { Prisma } from "@repo/db/client";
import { CartItem } from "../lib/store/atoms/cartItems";

const addOrder = async (
  userId: string,
  addressId: string | undefined,
  currency: string | undefined,
  amountPaidByCustomer: string | number | undefined,
  orderId: string | undefined,
  paymentId: string | undefined,
  totalItemCount: number,
  items: CartItem[],
  userName: string
) => {
  if (
    !userId ||
    !addressId ||
    !currency ||
    !amountPaidByCustomer ||
    !orderId ||
    !paymentId ||
    !totalItemCount ||
    !items ||
    !userName
  ) {
    return { error: "Required field missing!" };
  }

  const orderData = {
    currency,
    addressId,
    totalItemCount,
    items: items as unknown as Prisma.InputJsonValue,
    orderId,
    paymentId,
    amountPaidByCustomer: amountPaidByCustomer.toString(),
    userId,
  };

  try {
    const data = await prisma.orderItem.create({
      data: orderData,
    });

    if (data) {
      await prisma.allOrders.create({
        data: {
          ...orderData,
          orderItemId: data.id,
          userName: userName,
          orderStatus: "ORDERED",
        },
      });
      return {
        success: "Payment has been done successfully!",
        dataId: data.id,
      };
    } else {
      return {
        error:
          "Payment has done but not added to database please contact customer support",
      };
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export { addOrder };
