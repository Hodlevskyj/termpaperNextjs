import ProductDetails from '@/components/ProductDetails';
import Container from '@/components/ui/container';
import React from 'react';
import ListOfRating from './ListOfRating';
import getProductById from '../../../../actions/getProductById';
import AddRating from './AddRating';
import { getCurrentUser } from '../../../../actions/getCurrentUser';

interface IProdID {
    params: { id: string };
}

const ProductId = async ({ params }: IProdID) => {
    const product = await getProductById(params);
    const user = await getCurrentUser();

    if (!product) return <p>Product not found</p>;

    return (
        <Container>
            <ProductDetails product={product} />
            <div className='flex flex-col mt-20 gap-4'>
                <AddRating product={product} user={user}/>
                <ListOfRating product={product} />
            </div>
        </Container>
    );
}

export default ProductId;
