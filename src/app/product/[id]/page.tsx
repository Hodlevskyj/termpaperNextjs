import ProductDetails from '@/components/ProductDetails';
import Container from '@/components/ui/container';
import { product } from '@/utils/product';
import React from 'react'
import ListOfRating from './ListOfRating';

interface IProdID {
    productId?: string;
}

const ProductId = ({ params }: { params: IProdID }) => {
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