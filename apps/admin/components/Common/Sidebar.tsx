"use client";

import {
  Folder,
  HomeIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@repo/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", icon: HomeIcon, label: "Dashboard" },
    { href: "/orders", icon: ShoppingCartIcon, label: "Orders" },
    { href: "/products", icon: PackageIcon, label: "Products" },
    { href: "/categories", icon: Folder, label: "Categories" },
    { href: "/queries", icon: UsersIcon, label: "Queries" },
  ];

  return (
    <aside className='hidden w-64 h-screen flex-col border-r bg-background p-6 md:flex'>
      <div className='flex items-center gap-2'>
        <Image
          src={"https://d3rts3x4c8sg1r.cloudfront.net/Fooder_logo.png"}
          alt=''
          height={100}
          width={100}
          className='h-8 w-8 rounded-lg'
        />
        <h1 className='text-2xl font-bold'>Fooder</h1>
      </div>
      <nav className='mt-8 flex flex-col gap-4'>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
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
      </nav>
    </aside>
  );
};

export default Sidebar;
