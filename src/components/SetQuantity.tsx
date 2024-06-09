// "use client"
import React,{useState} from 'react'
import { CartProductType } from './ProductDetails';
import { Button } from './ui/button';

interface setQtyProps {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const SetQuantity: React.FC<setQtyProps> = ({
    cartProduct, cartCounter, handleQtyDecrease, handleQtyIncrease
}) => {
    return (
        <div className='flex gap-8 items-center'>
            {cartCounter ? null
                : <div className='font-sembold'>QUANTITY : </div>}
            <div className='flex gap-4 items-center text-base'>
                <Button variant="ghost" onClick={handleQtyDecrease}>-</Button>
                <div>{cartProduct.quantity}</div>
                <Button variant="ghost" onClick={handleQtyIncrease}>+</Button>
            </div>
        </div>
    )
}

export default SetQuantity
