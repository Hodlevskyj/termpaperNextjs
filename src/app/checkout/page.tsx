import FormWraper from '@/components/FormWraper'
import Container from '@/components/ui/container'
import React from 'react'
import CheckoutClient from './Checkout'

const Checkout = () => {
  return (
    <div>
      <Container>
        <FormWraper>
            <CheckoutClient />
        </FormWraper>
      </Container>
    </div>
  )
}

export default Checkout
