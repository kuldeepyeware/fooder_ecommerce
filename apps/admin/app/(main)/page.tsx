"use client";

import { BeatLoader } from "react-spinners";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/ui/components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllPayments } from "../../actions/razorPay";
import { getLast30DaysOrder } from "../../actions/orders";
import { getLast30DaysUser } from "../../actions/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CircleUserRound } from "@repo/ui/icons";
import { getCategories } from "../../actions/category";
import { getProductsCount } from "../../actions/product";

export default function Page() {
  const [revenue, setRevenue] = useState<number | undefined>();
  const [totalOrders, setTotalOrders] = useState<string | undefined>();
  const [newUsers, setNewUsers] = useState<string | undefined>();
  const [categoryCount, setCategoryCount] = useState<number | undefined>();
  const [productCount, setProductCount] = useState<number | undefined>();

  const { user } = useUser();

  useEffect(() => {
    const loadRevenueData = async () => {
      const revenueData = await getAllPayments();
      setRevenue(revenueData.totalRevenue);
    };

    const loadOrderData = async () => {
      const orderData = await getLast30DaysOrder();
      setTotalOrders(orderData.formattedLength);
    };

    const loadUserData = async () => {
      const userData = await getLast30DaysUser();
      setNewUsers(userData.formattedLength);
    };

    const loadCategoryData = async () => {
      const categoryData = await getCategories();
      setCategoryCount(categoryData?.length);
    };

    const loadProductData = async () => {
      const productData = await getProductsCount();
      setProductCount(productData);
    };

    loadOrderData();
    loadUserData();
    loadCategoryData();
    loadProductData();
    loadRevenueData();
  }, []);

  return (
    <div className='flex min-h-screen w-full overflow-hidden'>
      <div className='flex flex-1 flex-col'>
        <header className='flex h-16 items-center justify-between border-b bg-background px-6'>
          <div className='flex items-center gap-4'>
            <h1 className='text-xl font-bold'>Dashboard</h1>
          </div>
          <div className='flex items-center gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                  {user?.picture ? (
                    <Image
                      src='https://d3rts3x4c8sg1r.cloudfront.net/Admin_Photo.jpeg'
                      width={36}
                      height={36}
                      alt='Avatar'
                      className='rounded-full'
                    />
                  ) : (
                    <>
                      <CircleUserRound
                        size={30}
                        strokeWidth={1}
                        className='cursor-pointer'
                      />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <a href={"/api/auth/logout"}>
                  <DropdownMenuItem>
                  Logout
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className='flex-1 p-6'>
          <div className='flex  md:justify-center md:items-center items-start justify-start gap-6 flex-wrap '>
            <Card className='md:w-[371px] md:h-[162px] h-[161px] w-[264px]'>
              <CardHeader>
                <CardTitle>Total Sales</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-4xl font-bold'>
                  {revenue ? <span>&#8377;{revenue}</span> : <BeatLoader />}
                </div>
              </CardContent>
            </Card>
                <Card className='md:w-[371px] md:h-[162px] h-[161px] w-[264px]'>
              <CardHeader>
                <CardTitle>New Users</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-4xl font-bold'>
                  {newUsers ? newUsers : <BeatLoader />}
                </div>
              </CardContent>
            </Card>
                <Card className='md:w-[371px] md:h-[162px] h-[161px] w-[264px]'>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-4xl font-bold'>
                  {totalOrders ? totalOrders : <BeatLoader />}
                </div>
              </CardContent>
            </Card>
                <Card className='md:w-[371px] md:h-[162px] h-[161px] w-[264px]'>
              <CardHeader>
                <CardTitle>Total Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-4xl font-bold'>
                  {categoryCount ? categoryCount : 0}
                </div>
              </CardContent>
            </Card>
                <Card className='md:w-[371px] md:h-[162px] h-[161px] w-[264px]'>
              <CardHeader>
                <CardTitle>Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-4xl font-bold'>
                  {productCount ? productCount : 0}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
