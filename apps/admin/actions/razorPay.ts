/* eslint-disable no-constant-condition */
"use server";

import Razorpay from "razorpay";
import { getUnixTimestamps } from "../lib/getUnixDate";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID as string,
  key_secret: process.env.RAZORPAY_API_KEY_SECRET as string,
});

const getAllPayments = async () => {
  const time = getUnixTimestamps();
  const thirtyDaysAgoTimestamp = time.thirtyDaysAgoTimestamp;
  const nowTimestamp = time.nowTimestamp;

  let allCapturedPayments: any = [];
  let skip = 0;
  const count = 100;

  while (true) {
    const options = {
      from: thirtyDaysAgoTimestamp,
      to: nowTimestamp,
      count: count,
      skip: skip,
    };

    try {
      const payment = await instance.payments.all(options);

      if (payment.items.length === 0) {
        break;
      }

      const capturedPayments = payment.items.filter(
        (item) => item.status === "captured"
      );
      allCapturedPayments = allCapturedPayments.concat(capturedPayments);
      skip += count;
    } catch (error) {
      return { error: "Error fetching payments" };
    }
  }

  const totalRevenue = allCapturedPayments.reduce(
    (sum: number, payment: { amount: number }) => {
      return sum + payment.amount / 100;
    },
    0
  );

  const formattedRevenue = totalRevenue.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return {
    success: "All captured payments fetched successfully!",
    // totalCapturedPayments: allCapturedPayments.length,
    totalRevenue: formattedRevenue,
    // capturedPayments: allCapturedPayments,
  };
};

export { getAllPayments };
