"use client"
import React, { useState } from 'react'
import Container from './ui/container';
import { Rating } from '@mui/material';
import {Product, ColorAndProductImgs} from "../types/product"

interface ProductDetailsProps {
  product: any;
}

export type CartProductType={
  id:string,
  name:string,
  description:string,
  category:string,
  brand:string,
  selectedImg:ColorAndProductImgs,
  quantity:number,
  price:number  
}



const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct]=useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    brand: product.brand,
    category: product.category,
    selectedImg: {...product.images[0]},
    quantity:1,
  });
  const productRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length
    : 0;
  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden'>
        <div>Carousel</div>
        <div className='flex flex-col gap-1 text-slate-500 text-sm'>
          <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
          <div className='flex items-center gap-3'>
            <Rating value={productRating} readOnly />
            <div>{product.reviews.length} reviews</div>
          </div>
          <hr className='w-[30] my-2' />
          <div className='text-justify'>
            <p>{product.description}</p>
          </div>
          <hr className='w-[30] my-2' />
          <div>
            <span className='font-semibold'>CATEGORY : </span>
            {product.category}
          </div>
          <div>
            <span className='font-semibold'>BRAND : </span>
            {product.brand}
          </div>
          <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </div>
          <hr className='w-[30] my-2' />
          <div>color</div>
          <hr className='w-[30] my-2' />
          <div>quality</div>
          <hr className='w-[30] my-2' />
          <div>add to cart</div>
        </div>
      </div>
    </Container>
  )
}

export default ProductDetails
