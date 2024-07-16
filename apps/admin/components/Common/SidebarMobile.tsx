"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@repo/ui/components";
import Link from "next/link";
import {
  Folder,
  HomeIcon,
  MenuIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@repo/ui/icons";

import { usePathname } from "next/navigation";
import { useState } from "react";

const SidebarMobile = () => {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const links = [
    { href: "/", icon: HomeIcon, label: "Dashboard" },
    { href: "/orders", icon: ShoppingCartIcon, label: "Orders" },
    { href: "/products", icon: PackageIcon, label: "Products" },
    { href: "/categories", icon: Folder, label: "Categories" },
    { href: "/queries", icon: UsersIcon, label: "Queries" },
  ];

  return (
    <aside className='md:hidden h-screen block  flex-col border-r bg-background mt-2 p-2'>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>
          <MenuIcon className='h-8 w-8 ' />
        </SheetTrigger>
        <SheetContent side='left' className='w-[350px]'>
          <SheetHeader>
            <SheetTitle>
              <Link href={"/"} onClick={() => setIsSheetOpen(false)}>
                <span className='text-2xl font-medium'>Fooder</span>
              </Link>
            </SheetTitle>
            <SheetDescription className='space-y-2'>
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsSheetOpen(false)}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground "
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}>
                    <link.icon className='h-5 w-5' />
                    {link.label}
                  </Link>
                );
              })}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      {/* </Button> */}
    </aside>
  );
};

export default SidebarMobile;
