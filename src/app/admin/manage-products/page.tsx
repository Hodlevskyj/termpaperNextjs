import Container from '@/components/ui/container'
import React from 'react'
import ManageProducts from './ManageProducts'
import getProducts from '../../../../actions/getProduct'
import { getCurrentUser } from '../../../../actions/getCurrentUser'

const ManageProductspage = async () => {

    const products = await getProducts({ category: null });
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== 'ADMIN')
        return <p className='text-center'>ACCESS DENIED!</p>

    return (
        <Container>
            <ManageProducts products={products}/>
        </Container>
    )
}

export default ManageProductspage
