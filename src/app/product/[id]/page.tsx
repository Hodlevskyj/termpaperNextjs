import ProductDetails from '@/components/ProductDetails';
import Container from '@/components/ui/container';
import React from 'react'
import ListOfRating from './ListOfRating';
import { products } from '@/utils/products';

interface IProdID {
    productId?: string;
}

const ProductId = ({ params }: { params: IProdID }) => {
    const product=products.find((item)=>item.id === params.productId)
    return (
        <Container>
            <ProductDetails product={product} />
            <div className='flex flex-col mt-20 gap-4'>
                <div>Add Rating</div>
                <ListOfRating product={product}/>
            </div>

        </Container>
    )
}
export default ProductId;