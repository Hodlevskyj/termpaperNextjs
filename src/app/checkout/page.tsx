import FormWraper from '@/components/FormWraper'
import Container from '@/components/ui/container'
import React from 'react'
import CheckoutClient from './Checkout'
import CheckoutForm from './CheckoutForm'

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
