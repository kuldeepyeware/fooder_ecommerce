"use server";

import Razorpay from "razorpay";
import { nanoid } from "nanoid";
import crypto from "crypto";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID as string,
  key_secret: process.env.RAZORPAY_API_KEY_SECRET as string,
});

const generateOrder = async ({
  amount,
  userId,
  productId,
  userName,
}: {
  amount: number;
  userId: string;
  productId: string[];
  userName: string;
}) => {
  const chargeableAmount = amount * 100;
  const currency = "INR";

  const options = {
    amount: chargeableAmount,
    currency,
    receipt: nanoid(),
    notes: {
      paymentFor: "Fooder",
      userId: userId,
      userName: userName,
      productId: JSON.stringify(productId),
    },
  };

  try {
    const order = await instance.orders.create(options);
    return { success: "Order created successfully!", order };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

const verifyPayment = async (
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_KEY_SECRET as string)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return { success: "Payment has been verified successfully!" };
    } else {
      return {
        error:
          "Payment is not authentic, Please try again. Contact support for help",
      };
    }
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export { generateOrder, verifyPayment };
