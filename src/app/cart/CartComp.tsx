"use client"
import React from 'react'
import { useCart } from '../../../hooks/useCart'
import Link from 'next/link';
import { IoArrowBackOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button"
import HorizontalLine from '@/components/ui/HorizontalLine';
import CartContent from './CartContent';
import { priceFormat } from '@/utils/priceFormat';
import Heading from '@/components/Heading';


const CartComp = () => {
    const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className='flex flex-col items-center'>
                <p className='text-2xl'>Your cart is empty</p>
                <div>
                    <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
                        <IoArrowBackOutline />
                        <p>Start Shopping</p>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Heading title="Shopping Cart" center />
            <div className='grid grid-cols-5 text-xl gap-4 pb-2 pt-4 items-center'>
                <div className='col-span-2 justify-self-start'>PRODUCT</div>
                <div className='justify-self-center'>PRICE</div>
                <div className='justify-self-center'>QUANTITY</div>
                <div className='justify-self-end'>TOTAL</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return (
                        <CartContent key={item.id} item={item} />
                    )
                })}
            </div>

            <div className='border-t-[3.5px] border-purple-200 py-4 flex justify-between gap-4'>
                {/* <HorizontalLine /> */}
                <div>
                    <Button variant="destructive" onClick={() => { handleClearCart() }}>Clear Cart</Button>
                </div>
                <div>
                    <div className="font-bold">
                        <p>{priceFormat(cartTotalAmount)}</p>
                    </div>
                    <div>
                        <Button onClick={() => { }} className='gap-4 px-8 py-4 text-lg'>Order</Button>
                        <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
                            <IoArrowBackOutline />
                            <p>Continue Shopping</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartComp