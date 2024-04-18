"use client"
// import React, { useCallback, useState } from 'react'
// import Container from './ui/container';
// import { Rating } from '@mui/material';
// import { Product, ColorAndProductImgs } from "../types/product"
// import HorizontalLine from './ui/HorizontalLine';
// import SetColor from './SetColor';
// import { product } from '@/utils/product';

// interface ProductDetailsProps {
//   product: any;
// }

// export type SelectedImgType={
//   color:string,
//   colorCode:string,
//   image:string
// }

// export type CartProductType = {
//   id: string,
//   name: string,
//   description: string,
//   category: string,
//   brand: string,
//   selectedImg: SelectedImgType,
//   quantity: number,
//   price: number
// }



// const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
//   const [cartProduct, setCartProduct] = useState<CartProductType>({
//     id: product.id,
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     brand: product.brand,
//     category: product.category,
//     selectedImg: { ...product.images[0] },
//     quantity: 1,
//   });
//   const productRating = product.reviews && product.reviews.length > 0
//     ? product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length
//     : 0;

//   const handleColorSelect =useCallback((value:SelectedImgType)=>
//     {},[cartProduct.selectedImg])
//   }
//   return (
//     <Container>
//       <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden'>
//         <div>Carousel</div>
//         <div className='flex flex-col gap-1 text-slate-500 text-sm'>
//           <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
//           <div className='flex items-center gap-3'>
//             <Rating value={productRating} readOnly />
//             <div>{product.reviews.length} reviews</div>
//           </div>
//           <HorizontalLine/>
//           <div className='text-justify'>
//             <p>{product.description}</p>
//           </div>
//           <HorizontalLine/>
//           <div>
//             <span className='font-semibold'>CATEGORY : </span>
//             {product.category}
//           </div>
//           <div>
//             <span className='font-semibold'>BRAND : </span>
//             {product.brand}
//           </div>
//           <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
//             {product.inStock ? "In stock" : "Out of stock"}
//           </div>
//           <HorizontalLine/>
//           <SetColor
//           cartProduct={cartProduct}
//           images={product.images}
//           handleColorSelect={handleColorSelect}/>
//           <HorizontalLine/>
//           <div>quality</div>
//           <HorizontalLine/>
//           <div>add to cart</div>
//         </div>
//       </div>
//     </Container>
//   )
// }

// export default ProductDetails

import React, { useCallback, useState } from 'react';
import Container from './ui/container';
import { Rating } from '@mui/material';
import HorizontalLine from './ui/HorizontalLine';
import SetColor from './SetColor';
import { Product, ColorAndProductImgs } from "../types/product";
import { product } from '@/utils/product';

interface ProductDetailsProps {
  product: any; // Use the correct type for product
}

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    brand: product.brand,
    category: product.category,
    selectedImg: { ...product.images[0] },
    quantity: 1,
  });

  const productRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length
    : 0;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    // Your color select logic here
  }, [cartProduct.selectedImg]);

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
          <HorizontalLine/>
          <div className='text-justify'>
            <p>{product.description}</p>
          </div>
          <HorizontalLine/>
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
          <HorizontalLine/>
          <SetColor
            cartProduct={cartProduct}
            images={product.images}
            handleColorSelect={handleColorSelect}
          />
          <HorizontalLine/>
          <div>quality</div>
          <HorizontalLine/>
          <div>add to cart</div>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetails;

