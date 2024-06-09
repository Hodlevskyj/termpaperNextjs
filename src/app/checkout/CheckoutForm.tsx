"use client"
import React, { useEffect, useState } from 'react'
import { useCart } from '../../../hooks/useCart'
import { useElements, useStripe, PaymentElement,AddressElement } from '@stripe/react-stripe-js'
import { priceFormat } from '@/utils/priceFormat'
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast'
import Heading from '../../components/Heading'
import { Button } from '@/components/ui/button'

interface CheckoutFormProps{
    clientSecret:string,
    handleSetPaymentSuccess:(value:boolean)=>void
}

const CheckoutForm = ({clientSecret,handleSetPaymentSuccess}:CheckoutFormProps) => {
  const {cartTotalAmount,handleClearCart, handleSetPaymentIntent} = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading,setIsLoading] = useState(false);
  const formatprice = priceFormat(cartTotalAmount);

  useEffect(()=>{
    if(!stripe){
        return 
    }
    if(!clientSecret){
        return
    }
    handleSetPaymentSuccess(false);
  },[stripe]);

  const handleSubmit=async(event:React.FormEvent)=>{
    event.preventDefault();

    if(!stripe || !elements){
        return
    }
    setIsLoading(true);

    stripe.confirmPayment({
        elements,redirect:'if_required'
    }).then(result=>{
        if(!result.error){
            toast.success('Checkout Success')

            handleClearCart()
            handleSetPaymentSuccess(true)
            handleSetPaymentIntent(null)
        }
        setIsLoading(false);
    })
  }

    return (
    <form onSubmit={handleSubmit} id="payment-form">
        <div className='mb-6'>
            <Heading title="Enter your details"/>
        </div>
        <h2 className=' font-semibold'>Address Information</h2>
        <AddressElement options={{
          mode:'shipping',
          allowedCountries:["US","UA","PL"]
        }}/>
        <h2 className='font-semibold mt-4 mb-2'>Payment Information</h2>
        <PaymentElement id="payment-element" options={{layout:"tabs"}}/>
        <div className='py-4 text-center text-3xl font-bold text-slate-600'>
          Total: {formatprice}
        </div>
        <Button className='w-full' variant="secondary" onClick={()=>{}}>{isLoading ? 'Processing' : 'Pay now'}</Button>
    </form>
  )
}

export default CheckoutForm
