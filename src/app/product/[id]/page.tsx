import ProductDetails from '@/components/ProductDetails';
import Container from '@/components/ui/container';
import { product } from '@/utils/product';
import React from 'react'

interface IProdID{
    productId?:string;
}

const ProductId=({params}:{params:IProdID})=>{
    return(
        <Container>
            <ProductDetails product={product}/>
        </Container>
    )
}
export default ProductId;