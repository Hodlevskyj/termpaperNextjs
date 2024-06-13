import ProductDetails from '@/components/ProductDetails';
import Container from '@/components/ui/container';
import React from 'react';
import ListOfRating from './ListOfRating';
import getProductById from '../../../../actions/getProductById';

interface IProdID {
    params: { id: string };
}

const ProductId = async ({ params }: IProdID) => {
    const product = await getProductById(params);

    if (!product) return <p>Product not found</p>;

    return (
        <Container>
            <ProductDetails product={product} />
            <div className='flex flex-col mt-20 gap-4'>
                <div>Add Rating</div>
                <ListOfRating product={product} />
            </div>
        </Container>
    );
}

export default ProductId;
