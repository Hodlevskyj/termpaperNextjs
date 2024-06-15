"use client"
import React, { useCallback, useEffect, useState } from 'react';
import Container from './ui/container';
import { Rating } from '@mui/material';
import HorizontalLine from './ui/HorizontalLine';
// import SetColor from './SetColor';
import { Product } from "../types/product";
import { products } from '@/utils/products';
import SetQuantity from './SetQuantity';
// import Button from './Button';
import { Button } from "@/components/ui/button"
import CustomCarousel from './CustomCarousel';
import { useCart } from '../../hooks/useCart';
import { IoCheckmarkCircle } from "react-icons/io5";
import { useRouter } from 'next/navigation';


interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  // selectedImg: {
  //   image: string
  // };
  selectedImg: string;
  quantity: number;
  price: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddItemToCart, cartProducts } = useCart()
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    brand: product.brand,
    category: product.category,
    // selectedImg: { ...product.images[0] },
    selectedImg: product.images[0],
    quantity: 1,
  });

  const router = useRouter()
  console.log(cartProducts);

  useEffect(() => {
    setIsProductInCart(false)
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
    // }, [cartProducts]);
  }, [cartProducts, product.id]);

  const productRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length
    : 0;


  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 30) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 }
    })
  }, [cartProduct])
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 }
    })
  }, [cartProduct])

  return (
    <Container>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>
        <CustomCarousel cartProduct={cartProduct} product={product} />
        <div className='flex flex-col gap-1 text-slate-500 text-sm'>
          <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
          <div className='flex items-center gap-3'>
            <Rating value={productRating} readOnly />
            <div>{product.reviews.length} reviews</div>
          </div>
          <HorizontalLine />
          <div className='text-justify'>
            <p>{product.description}</p>
          </div>
          <HorizontalLine />
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
          <HorizontalLine />
          {product.inStock ? (
            isProductInCart ? (
              <>
                <p className='mb-2 text-emerald-500 flex items-center gap-1'>
                  <IoCheckmarkCircle size={24} className='text-emerald-500' />
                  <p>Product added to cart</p>
                </p>
                <div>
                  <Button variant="outline" className='w-full' onClick={() => { router.push('/cart') }} >View Cart</Button>
                </div>
              </>
            ) : (
              <>
                <SetQuantity
                  cartProduct={cartProduct}
                  handleQtyIncrease={handleQtyIncrease}
                  handleQtyDecrease={handleQtyDecrease}
                />
                <HorizontalLine />
                <div>
                  <Button variant="secondary" className='w-full'
                    onClick={() => handleAddItemToCart(cartProduct)}>
                    Add to Cart
                  </Button>
                </div>
              </>
            )
          ) : (
            <Button variant="outline" className='w-full' onClick={() => { router.push('#') }} >Product is out of stock</Button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ProductDetails;

// 'use client'
// import React, { useCallback, useEffect, useState } from 'react';
// import Container from './ui/container';
// import { Rating } from '@mui/material';
// import HorizontalLine from './ui/HorizontalLine';
// import { Button } from "@/components/ui/button";
// import CustomCarousel from './CustomCarousel';
// import SetQuantity from './SetQuantity';
// import { useCart } from '../../hooks/useCart';
// import { IoCheckmarkCircle } from "react-icons/io5";
// import { useRouter } from 'next/navigation';
// import { Product } from "../types/product";

// interface ProductDetailsProps {
//   product: Product; // Assuming Product type is imported correctly
// }

// export type CartProductType = {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   brand: string;
//   selectedImg: string;
//   quantity: number;
//   price: number;
// }

// const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
//   const { handleAddItemToCart, cartProducts } = useCart()
//   const [isProductInCart, setIsProductInCart] = useState(false);
//   const [cartProduct, setCartProduct] = useState<CartProductType>({
//     id: product.id,
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     brand: product.brand,
//     category: product.category,
//     selectedImg: product.image[0], // Assuming images array is available
//     quantity: 1,
//   });

//   const router = useRouter()

//   useEffect(() => {
//     setIsProductInCart(false)
//     if (cartProducts) {
//       const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
//       if (existingIndex > -1) {
//         setIsProductInCart(true);
//       }
//     }
//   }, [cartProducts, product.id]);

//   const productRating = product.reviews && product.reviews.length > 0
//     ? product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length
//     : 0;

//   const handleQtyIncrease = useCallback(() => {
//     if (cartProduct.quantity === 30) return;
//     setCartProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
//   }, [cartProduct])

//   const handleQtyDecrease = useCallback(() => {
//     if (cartProduct.quantity === 1) return;
//     setCartProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
//   }, [cartProduct])

//   return (
//     <Container>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4'>
//         <CustomCarousel cartProduct={cartProduct} product={product} />
//         <div className='flex flex-col gap-1 text-slate-500 text-sm'>
//           <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
//           <div className='flex items-center gap-3'>
//             <Rating value={productRating} readOnly />
//             <div>{product.reviews.length} reviews</div>
//           </div>
//           <HorizontalLine />
//           <div className='text-justify'>
//             <p>{product.description}</p>
//           </div>
//           <HorizontalLine />
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
//           <HorizontalLine />
//           {product.inStock ? (
//             isProductInCart ? (
//               <>
//                 <p className='mb-2 text-emerald-500 flex items-center gap-1'>
//                   <IoCheckmarkCircle size={24} className='text-emerald-500' />
//                   <p>Product added to cart</p>
//                 </p>
//                 <div>
//                   <Button variant="outline" className='w-full' onClick={() => { router.push('/cart') }} >View Cart</Button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <SetQuantity
//                   cartProduct={cartProduct}
//                   handleQtyIncrease={handleQtyIncrease}
//                   handleQtyDecrease={handleQtyDecrease}
//                 />
//                 <HorizontalLine />
//                 <div>
//                   <Button variant="secondary" className='w-full'
//                     onClick={() => handleAddItemToCart(cartProduct)}>
//                     Add to Cart
//                   </Button>
//                 </div>
//               </>
//             )
//           ) : (
//             <Button variant="outline" className='w-full' onClick={() => { router.push('#') }} >Product is out of stock</Button>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default ProductDetails;
