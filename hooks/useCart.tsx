"use client"

import { CartProductType } from "@/components/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount:number;
    cartProducts: CartProductType[] | null;
    handleAddItemToCart: (product: CartProductType) => void
    handleRemoveItemFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
    handleClearCart: () => void
}

interface Props {
    [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null)


export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalAmount, setCartTotalAmount] = useState(0)

    // console.log('qty',cartTotalQty)
    // console.log('amount',cartTotalAmount)
    useEffect(() => {
        const cartItems: any = localStorage.getItem('cartItems')
        const cProducts: CartContextType[] | null = JSON.parse(cartItems)
        setCartProducts(cartProducts)
    }, []);

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity
                    acc.total += itemTotal
                    acc.qty += item.quantity
                    return acc
                }, {
                    total: 0,
                    qty: 0
                })
                setCartTotalQty(qty);
                setCartTotalAmount(total);

            }

        }
        getTotals()
    }, [cartProducts])


    const handleAddItemToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }
            toast.success('Product added to cart')
            localStorage.setItem('cartItems', JSON.stringify(updatedCart))
            return updatedCart;
        })
    }, []);

    const handleRemoveItemFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })
            setCartProducts(filteredProducts)
            toast.success('Product removed from cart')
            localStorage.setItem('cartItems', JSON.stringify(filteredProducts))
        }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 30) {
            return toast.error('The maximum quantity is 30')
        }
        if (cartProducts) {
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }
            setCartProducts(updatedCart)
            localStorage.setItem('cartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if (product.quantity === 1) {
            return toast.error('The maximum quantity is 1')
        }
        if (cartProducts) {
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity;
            }
            setCartProducts(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart))


        }
    }, [cartProducts])


    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('cartItems', JSON.stringify(null))
    }, [cartProducts])

    const value = { 
        cartTotalQty, 
        cartProducts, 
        cartTotalAmount,
        handleAddItemToCart, 
        handleRemoveItemFromCart, 
        handleCartQtyIncrease, 
        handleCartQtyDecrease, 
        handleClearCart,
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used with cartContextProvider")
    }
    return context;
}