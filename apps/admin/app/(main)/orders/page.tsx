"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components";
import { EyeIcon, TrashIcon } from "@repo/ui/icons";
import { CardFooter } from "@repo/ui/uicomponents/ui/card";
import { useEffect, useState } from "react";
import {
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from "../../../actions/orders";
import OrderDetailsDialog from "../../../components/orders/OrderDetailsDialog";
import { BeatLoader } from "react-spinners";

export interface Order {
  id: string;
  date: string;
  customer: string;
  total: number;
  items: {
    id: string;
    image: string;
    price: number;
    quantity: number;
    title: string;
  }[];
  status: "ORDERED" | "DISPATCH" | "DELIVERED" | "PENDING";
}

// export const getStatusBadgeVariant = (
//   status: "ORDERED" | "DISPATCH" | "DELIVERED" | "PENDING"
// ) => {
//   switch (status) {
//     case "ORDERED":
//       return "default";
//     case "DISPATCH":
//       return "secondary";
//     case "DELIVERED":
//       return "delivered";
//     case "PENDING":
//       return "pending";
//     default:
//       return "default";
//   }
// };

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page: number) => {
    setIsLoading(true);
    try {
      const result = await getOrders(page);
      if (result.success) {
        setOrders(result.orders as Order[]);
        setTotalPages(result.totalPages);
      } else {
        setOrders([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      const result = await deleteOrder(orderId);
      if (result.success) {
        setOrders(orders.filter((order) => order.id !== orderId));
      } else {
        alert("Failed to delete order. Please try again.");
      }
    }
  };

  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } else {
      alert("Failed to update order status. Please try again.");
    }
  };

  return (
    <main className='flex-1 p-6 max-w-[450px] sm:max-w-full'>
      <div>
        <Card className='min-h-[200px]'>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              View and manage your recent orders
            </CardDescription>
          </CardHeader>
          {orders.length >= 1 ? (
            <>
              <CardContent>
                {isLoading ? (
                  <div className='ml-7 min-h-[200px] justify-center items-center flex'>
                    <BeatLoader />
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <span className='font-medium'>#{order.id}</span>
                          </TableCell>
                          <TableCell>
                            <time dateTime={order.date}>
                              {new Date(order.date).toLocaleDateString()}
                            </time>
                          </TableCell>
                          <TableCell>
                            <span className='font-medium'>
                              {order.customer}
                            </span>
                          </TableCell>
                          <TableCell>&#8377;{order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Select
                              defaultValue={order.status}
                              onValueChange={(value) =>
                                handleUpdateOrderStatus(
                                  order.id,
                                  value as Order["status"]
                                )
                              }>
                              <SelectTrigger className='w-[120px]'>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='ORDERED'>ORDERED</SelectItem>
                                <SelectItem value='DISPATCH'>
                                  DISPATCH
                                </SelectItem>
                                <SelectItem value='DELIVERED'>
                                  DELIVERED
                                </SelectItem>
                                <SelectItem value='PENDING'>PENDING</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className='flex gap-5'>
                            <Button
                              variant='outline'
                              size='icon'
                              onClick={() => handleViewOrder(order)}>
                              <EyeIcon className='h-4 w-4' />
                              <span className='sr-only'>View order</span>
                            </Button>
                            <Button
                              variant='outline'
                              size='icon'
                              onClick={() => handleDeleteOrder(order.id)}>
                              <TrashIcon className='h-4 w-4' />
                              <span className='sr-only'>Delete order</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              <CardFooter>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={currentPage === index + 1}
                          onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </>
          ) : (
            <div className='ml-7 min-h-[200px] justify-center items-center flex text-xl font-medium'>
              No orders generated yet
            </div>
          )}
        </Card>
      </div>
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </main>
  );
};

export default OrdersPage;
