import { CartProductType } from '@/components/ProductDetails'
import React from 'react'
import { priceFormat } from '@/utils/priceFormat'
import Link from 'next/link'
import { reduceText } from '@/utils/reduceText'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import SetQuantity from '@/components/SetQuantity'
import { useCart } from '../../../hooks/useCart'

interface CartContentProps {
    item: CartProductType
}

const CartContent: React.FC<CartContentProps> = ({ item }) => {
    const { handleRemoveItemFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart()
    return (
        <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-zinc-500 py-4 items-center'>
            <div className='col-span-2 justify-self-start gap-2 md:gap-4'>
                <Link href={`/product/${item.id}`}>
                    <div className='relative w-[70px] aspect-square'>
                        <Image src={item.selectedImg} alt={item.name} fill className='object-contain' />
                    </div>
                </Link>
                <div className='flex flex-col justify-between'>
                    <Link href={`/product/${item.id}`}>
                        {reduceText(item.name)}
                    </Link>
                    <div>
                        <Button variant="ghost" onClick={() => handleRemoveItemFromCart(item)}>Remove</Button>
                    </div>

                </div>
            </div>
            <div className='justify-self-center'>{priceFormat(item.price)}</div>
            <div className='justify-self-center'>
                <SetQuantity cartCounter={true} cartProduct={item} handleQtyIncrease={() => { handleCartQtyIncrease(item) }} handleQtyDecrease={() => { handleCartQtyDecrease(item) }} />
            </div>
            <div className='justify-self-end font-bold'>
                {priceFormat(item.price * item.quantity)}
            </div>

        </div>
    )
}

export default CartContent
