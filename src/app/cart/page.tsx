import Container from '@/components/ui/container'
import React from 'react'
import CartComp from './CartComp'
import { getCurrentUser } from '../../../actions/getCurrentUser'

export default async function Cart() {
  const currentUser = await getCurrentUser()
  return (
    <div>
      <Container>
        <CartComp currentUser={currentUser}/>
      </Container>
    </div>
  )
}