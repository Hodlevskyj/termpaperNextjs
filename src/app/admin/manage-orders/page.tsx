import React from 'react'
import ManageOrders from './ManageOrders'
import { getCurrentUser } from '../../../../actions/getCurrentUser'
import getOrders from '../../../../actions/getOrders'
import Container from '@/components/ui/container'

const Orderspage = async() => {
    const orders = await getOrders();
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== 'ADMIN')
        return <p className='text-center'>ACCESS DENIED!</p>

    return (
    <Container>
      <ManageOrders orders={orders}/>
      {/* <ManageOrders /> */}
    </Container>
  )
}

export default Orderspage
