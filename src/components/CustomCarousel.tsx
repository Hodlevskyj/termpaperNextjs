
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
                      src={image}
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