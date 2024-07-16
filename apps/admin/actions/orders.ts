"use server";

import prisma from "@repo/db/client";
import { get30DaysAgoDate } from "../lib/get30DaysAgoDate";
import { Order } from "../app/(main)/orders/page";

const getLast30DaysOrder = async () => {
  const { thirtyDaysAgo } = get30DaysAgoDate();

  try {
    const data = await prisma.allOrders.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
          lte: new Date(),
        },
      },
    });

    const formattedLength = data.length.toLocaleString("en-IN");

    return {
      success: "All 30 days ago order captured successfully!",
      formattedLength,
    };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// const getOrderSalesDataForChart = async () => {
//   const sixMonthsAgo = new Date();
//   sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

//   try {
//     const orders = await prisma.allOrders.findMany({
//       where: {
//         createdAt: {
//           gte: sixMonthsAgo,
//         },
//       },
//       select: {
//         createdAt: true,
//         amountPaidByCustomer: true,
//       },
//     });

//     const monthlySales: any = {};
//     const monthlyOrderCount: any = {};

//     const months = [];
//     for (let i = 0; i < 6; i++) {
//       const d = new Date();
//       d.setMonth(d.getMonth() - i);
//       const month = d.toLocaleString("default", { month: "long" });
//       months.unshift(month);
//       monthlySales[month] = 0;
//       monthlyOrderCount[month] = 0;
//     }

//     orders.forEach((order) => {
//       const month = order.createdAt.toLocaleString("default", {
//         month: "long",
//       });
//       const amount = parseInt(order.amountPaidByCustomer, 10) / 100;

//       if (monthlySales.hasOwnProperty(month)) {
//         monthlySales[month] += amount;
//         monthlyOrderCount[month] += 1;
//       }
//     });

//     const chartData = months.map((month) => ({
//       month,
//       sales: Math.round(monthlySales[month]),
//       orderCount: monthlyOrderCount[month],
//     }));

//     return { success: true, chartData };
//   } catch (error) {
//     return { success: false, error: "Error fetching order sales data" };
//   }
// };

const getOrders = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  try {
    const [orders, totalOrders] = await Promise.all([
      prisma.allOrders.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          orderItemId: true,
          createdAt: true,
          userName: true,
          amountPaidByCustomer: true,
          orderStatus: true,
          items: true,
        },
      }),
      prisma.allOrders.count(),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    return {
      orders: orders.map((order) => ({
        id: order.orderItemId,
        date: order.createdAt.toISOString(),
        customer: order.userName,
        total: parseFloat(order.amountPaidByCustomer) / 100,
        status: order.orderStatus,
        items:
          typeof order.items === "string"
            ? JSON.parse(order.items)
            : order.items,
      })),
      totalPages,
      currentPage: page,
      success: true,
    };
  } catch (error) {
    return { error: "Error fetching orders data" };
  }
};

const deleteOrder = async (orderId: string) => {
  try {
    await prisma.allOrders.delete({
      where: { orderItemId: orderId },
    });

    await prisma.orderItem.delete({
      where: { id: orderId },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete order:", error);
    return { success: false, error: "Failed to delete order" };
  }
};

const updateOrderStatus = async (
  orderId: string,
  newStatus: Order["status"]
) => {
  try {
    await prisma.allOrders.update({
      where: { orderItemId: orderId },
      data: { orderStatus: newStatus },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
};

export { getLast30DaysOrder, getOrders, deleteOrder, updateOrderStatus };
