"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useCart } from '../../../hooks/useCart';
import { useRouter } from 'next/navigation';
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import toast from 'react-hot-toast';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    console.log("paymentIntent", paymentIntent);
    console.log("clientSecret", clientSecret);

    useEffect(() => {
        if (cartProducts && cartProducts.length > 0 && !clientSecret) {
            setLoading(true);
            setError(false);
            fetch('/api/createPayment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartProducts,
                    paymentIntent: paymentIntent
                })
            })
                .then((res) => {
                    setLoading(false);
                    if (res.status === 401) {
                        return router.push('/login');
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data?.paymentIntent?.client_secret) {
                        setClientSecret(data.paymentIntent.client_secret);
                        handleSetPaymentIntent(data.paymentIntent.id);
                    } else {
                        setError(true);
                        toast.error("Не вдалося створити платіжний намір");
                    }
                })
                .catch((error) => {
                    setError(true);
                    setLoading(false);
                    console.log("Error", error);
                    toast.error("Щось пішло не так");
                });
        }
    }, [cartProducts, paymentIntent, clientSecret, handleSetPaymentIntent, router]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        }
    };

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value);
    }, []);

    return (
        <div>
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                        clientSecret={clientSecret}
                        handleSetPaymentSuccess={handleSetPaymentSuccess}
                    />
                </Elements>
            )}
            {loading && <div className='text-center'>Завантаження оплати...</div>}
            {error && <div className='text-center text-rose-600'>Помилка</div>}
            {paymentSuccess && (
                <div className='flex items-center flex-col gap-4'>
                    <div className='text-center'>Оплата успішна</div>
                    <div className='w-full'>
                        <Button onClick={() => router.push('/order')}>
                            Переглянути ваше замовлення
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutClient;
