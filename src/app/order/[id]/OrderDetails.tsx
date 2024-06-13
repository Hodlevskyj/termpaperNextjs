'use client'
import Heading from '@/components/Heading'
import { priceFormat } from '@/utils/priceFormat'
import { Order } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface OrderDetailsProps{
    order:Order
}


const OrderDetails = ({order}:OrderDetailsProps) => {
  const router = useRouter();
    return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
        <div className='mt-8'>
            <Heading title='Order Details' center/>
        </div>
        <div>Order ID: {order.id}</div>
        <div>Total amount: {priceFormat(order.amount)}</div>
        <div>Payment Status: {order.status === 'pending' ? 'pending' : 'delivered'}</div>
        <div>Payment Status: {order.deliveryStatus === 'delivered' ? 'delivered' : 'dispatch'}</div>
    </div>
  )
}

export default OrderDetails
