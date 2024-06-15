"use client"
import React, { useState } from 'react'
import Link from "next/link"
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
  CirclePlus,
  ShoppingBasket,
  ListOrdered
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SideNav = () => {

  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = (itemName: any) => {
    setActiveItem(itemName);
  }

  return (
    <div>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/add-products"
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${activeItem === 'AddProduct' ? 'bg-primary' : ''}`}
                onClick={() => handleItemClick('AddProduct')}
              >
                <CirclePlus className="h-5 w-5" />
                <span className="sr-only">Add Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Add Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/manage-products"
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${activeItem === 'ManageProduct' ? 'bg-primary' : ''}`}
                onClick={() => handleItemClick('ManageProduct')}
              >
                <ShoppingBasket className="h-5 w-5" />
                <span className="sr-only">Manage Products</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Manage Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/manage-orders"
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${activeItem === 'ManageOrders' ? 'bg-primary' : ''}`}
                onClick={() => handleItemClick('ManageOrders')}
              >
                <ListOrdered className="h-5 w-5" />
                <span className="sr-only">Manage Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Manage Orders</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </div>
  )
}

export default SideNav
