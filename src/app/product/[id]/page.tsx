import ProductDetails from '@/components/ProductDetails';
import Container from '@/components/ui/container';
import { product } from '@/utils/product';
import React from 'react'

interface ProdID{
    productId?:string;
}

const ProductId=({params}:{params:ProdID})=>{
    return(
        <Container>
            <h1><ProductDetails product={product}/></h1>
        </Container>
    )
}
export default ProductId;