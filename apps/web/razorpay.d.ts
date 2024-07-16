/* eslint-disable no-unused-vars */
declare namespace Razorpay {
  interface Options {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => void;
    prefill?: {
      name: string;
      email: string;
    };
    theme?: {
      color: string;
    };
    image?: string;
  }
}

interface Window {
  Razorpay: new (options: Razorpay.Options) => any;
}
