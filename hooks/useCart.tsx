import { CartProductType } from "@/components/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddItemToCart: (product: CartProductType) => void
}
interface Props {
    [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null)


export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    
    useEffect(()=>{
        const cartItems:any = localStorage.getItem('cartItems')
        const cProducts: CartContextType[] | null = JSON.parse(cartItems)
        setCartProducts(cartProducts)
    },[])
    const handleAddItemToCart = useCallback((product:CartProductType) => {
        setCartProducts((prev)=>{
            let updatedCart;
            if(prev){
                updatedCart = [...prev,product];
            }else{
                updatedCart = [product];
            }
            localStorage.setItem('cartItems',JSON.stringify(updatedCart))
            return updatedCart;
        })
    }, []);
    const value = { cartTotalQty, cartProducts, handleAddItemToCart }

    
    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used with cartContextProvider")
    }
    return context;
}