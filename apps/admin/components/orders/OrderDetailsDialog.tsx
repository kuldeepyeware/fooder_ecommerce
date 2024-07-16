"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@repo/ui/components";
import { Order } from "../../app/(main)/orders/page";
import Image from "next/image";

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='overflow-auto max-h-[700px] rounded-lg max-w-[480px]'>
        <DialogHeader>
          <DialogTitle>Order Details - #{order.id}</DialogTitle>
        </DialogHeader>
        <div className='mt-4 space-y-4'>
          <DialogDescription>
            View the details of the order below.
          </DialogDescription>
          <div className='grid grid-cols-2 gap-2'>
            <div className='font-medium'>Date:</div>
            <div>{new Date(order.date).toLocaleDateString()}</div>
            <div className='font-medium'>Customer:</div>
            <div>{order.customer}</div>
            <div className='font-medium'>Total:</div>
            <div>₹{order.total.toFixed(2)}</div>
            <div className='font-medium'>Status:</div>
            <div>{order.status}</div>
          </div>
          <div>
            <h4 className='font-medium mb-2'>Items:</h4>
            <ul className='space-y-2'>
              {order?.items.map((item) => (
                <li key={item.id} className='flex items-center space-x-2'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className='rounded'
                  />
                  <div className='flex-grow'>
                    <div className='text-sm font-medium'>{item.title}</div>
                    <div className='text-xs'>Quantity: {item.quantity}</div>
                    <div className='text-xs'>
                      Price: ₹{item.price.toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
