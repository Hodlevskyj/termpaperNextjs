"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import Container from "./ui/container"
import { Button } from "./ui/button"
import { Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import ProfileButton from "./ui/ProfileButton"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation"
import { useCart } from "../../hooks/useCart"
import Categories from "./Categories"



const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { cartTotalQty } = useCart();
  // const routes = [
  //   {
  //     href: "/products",
  //     label: "Products",
  //   },
  //   {
  //     href: "/categories",
  //     label: "Categories",
  //   },
  //   {
  //     href: "/onsale",
  //     label: "On Sale",
  //   },
  // ]
  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">
                NexjsStore
              </h1>
            </Link>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              aria-label="Shopping Cart"
              onClick={() => router.push('/cart')}
            >
              <div>
                {/* <ShoppingCart className="h-6 w-6"></ShoppingCart> */}
                <ShoppingCart></ShoppingCart>
              </div>
              {/* <span className="sr-only">Shopping Cart</span> */}
              {/* <span className="absolute top-[-10px] right-15px bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">{cartTotalQty}</span> */}
              <span className="absolute top-[1.5px] right-[138px] bg-gray-400 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
                {cartTotalQty}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme ==
                "dark" ? "light" : "dark"
              )}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all
                dark:-rotate-90 dark:scale-0"/>
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all
                dark:rotate-0 dark:scale-100"/>
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
