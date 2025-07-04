import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Rating } from "@mui/material";
import { reduceText } from "@/utils/reduceText";
import { priceFormat } from "@/utils/priceFormat";


interface ProductCardProps {
    data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const productRating = data.reviews.reduce((acc:number, item:any) => 
        item.rating + acc,0) / data.reviews.length; // 0 - default value for acc
    return (
        <Link href={`/product/${data.id}`} className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg">
            <Card className="rounded-lg border-2">
                <CardContent className="pt-4">
                    <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
                        <Image
                            src={data.images[0]}
                            alt=""
                            fill
                            className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start">
                    <div>
                        <p className="font-semibold text-lg">{reduceText(data.name)}</p>
                        <div className="bg-yellow">
                            <Rating value={productRating} readOnly />
                        </div>
                        <p>{data.reviews.length} reviews</p>
                        <p className="text-sm text-primary/80">{data.category}</p>
                    </div>
                    <div className="flex items-center justify-between">{priceFormat(data?.price)}</div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ProductCard;