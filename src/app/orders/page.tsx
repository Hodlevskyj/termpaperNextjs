import React from 'react'
import { getCurrentUser } from '../../../actions/getCurrentUser'
import Container from '@/components/ui/container'
import Orders from './Orders'
import getOrdersByUserId from '../../../actions/getOrdersByUserId'

const Orderspage = async() => {
    const currentUser = await getCurrentUser()

    if (!currentUser)
        return <p className='text-center'>ACCESS DENIED!</p>

    const orders = await getOrdersByUserId(currentUser.id)

    if (!orders)
        return <p className='text-center'>No orders available</p>
    return (
    <Container>
      <Orders orders={orders}/>
      {/* <ManageOrders /> */}
    </Container>
  )
}

export default Orderspage
