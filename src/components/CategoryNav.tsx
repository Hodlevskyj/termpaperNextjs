// 'use client'
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ProductList from "@/components/ProductList";
import { usePathname, useSearchParams } from 'next/navigation';
import { categories } from '../utils/categories';
import Category from './Category';
import Categories from "@/components/Categories"



const CategoryNav = () => {
    // const params = useSearchParams()
    // const category=params?.get('category')
    // const pathname=usePathname()
    // const isMainPage=pathname ==='/'
    // if(!isMainPage) return null
    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">

                    {/* <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Phone
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Laptop
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Watch
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Camera
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Desktop
                    </Link> */}
                    <div>
                        {/* {categories.map((item) => (
                            <Category
                                key={item.label}
                                label={item.label}
                                selected={category == item.label || (category == null &&
                                    item.label == 'All'
                                )}
                            />
                        ))} */}
                        <Categories />
                    </div>
                </nav>

                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                </div>
            </header>
            {/* <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mt-4">
                <ProductList searchParams={{ category: null, searchTerm: '' }} />
            </div> */}
        </div>

    )
}
export default CategoryNav;





