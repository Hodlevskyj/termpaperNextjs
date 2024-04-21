import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CartProductType, SelectedImgType } from "./ProductDetails"
import { product } from "@/utils/product";

interface ProductImageProps {
  cartProduct: CartProductType,
  product: any,
  handleColorSelect: (value: SelectedImgType) => void;
}

const CustomCarousel = () => {
  return (
    <div className="ml-4">
    <Carousel className="grid grid-cols-1">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="z-10 -left-2" />
      <CarouselNext className="z-10 -right-2  " />
    </Carousel>
    </div>
  )
}
export default CustomCarousel;
