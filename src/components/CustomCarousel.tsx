// import * as React from "react"
// import Image from 'next/image'

// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import { CartProductType } from "./ProductDetails"
// import { product } from "@/utils/product";

// interface ProductProps {
//   cartProduct: CartProductType,
//   product: any,
// }

// // const CustomCarousel: React.FC<ProductImageProps> = ({ cartProduct, product, handleColorSelect }) => {
// const CustomCarousel: React.FC<ProductProps> = ({ cartProduct, product }) => {
//   return (
//     <div className="ml-4">
//       <Carousel className="grid grid-cols-1">
//         <CarouselContent>
//           {Array.from({ length: 5 }).map((_, index) => (
//             <CarouselItem key={index}>
//               <div className="p-1">
//                 <Card>
//                   <CardContent className="flex aspect-square items-center justify-center p-6">
//                     {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
//                     {/* {product.images.map((image: SelectedImgType) => {
//                       return <div key={image.color} onClick={() =>
//                         handleColorSelect(image)} className="relative w-[80%]"
//                       >
//                         <Image src={image.image} alt={image.color} fill className="object-contain" />
//                       </div>
//                     })} */}
//                     {/* <Image src={cartProduct.selectedImg.image} alt={cartProduct.name} fill className="w-full h-full object-contain"/> */}
//                     {product.images.map((image: any) => {
//                       return (
//                         <>
//                           {/* <Image src={cartProduct.selectedImg} alt={cartProduct.name} fill className="w-full h-full object-contain" /> */}
//                           <Image src={image.image} alt={image.name} fill className="w-full h-full object-contain" />

//                         </>
//                       )
//                     })}
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="z-10 -left-2" />
//         <CarouselNext className="z-10 -right-2  " />
//       </Carousel>
//     </div>
//   )
// }
// export default CustomCarousel;

import React from "react"
import Image from 'next/image'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CartProductType } from "./ProductDetails"

interface ProductProps {
  cartProduct: CartProductType,
  product: any,
}

const CustomCarousel: React.FC<ProductProps> = ({ cartProduct, product }) => {
  return (
    <div className="ml-4">
      <Carousel className="grid grid-cols-1">
        <CarouselContent>
          {product.images.map((image: any, index: number) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <Image
                      src={image.image}
                      alt={`Image ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
                      className="absolute"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="z-10 -left-2" />
        <CarouselNext className="z-10 -right-2" />
      </Carousel>
    </div>
  )
}

export default CustomCarousel;