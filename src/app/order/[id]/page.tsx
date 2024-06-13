import ProductDetails from '@/components/ProductDetails';
import Container from '@/components/ui/container';
import React from 'react'
import OrderDetails from './OrderDetails';
import getOrderById from '../../../../actions/getOrderById';

interface IOrderID {
    id?: string;
}

const OrderId = async ({ params }: { params: IOrderID }) => {

    const order=await getOrderById(params);
    if(!order) return <p>No Order</p>;
    return (
        <Container>
            <OrderDetails order={order} />
        </Container>
    )
}
export default OrderId;