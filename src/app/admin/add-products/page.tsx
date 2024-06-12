import Container from '@/components/ui/container'
import React from 'react'
import AddProductForm from './AddProductForm'
import FormWraper from '@/components/FormWraper'
import { getCurrentUser } from '../../../../actions/getCurrentUser'


const ManageProducts  =async () => {
  const currentUser=await getCurrentUser();
  if(!currentUser || currentUser.role !=='ADMIN') 
    return <p className='text-center'>ACCESS DENIED!</p>
  return (
    <div>
    manage products
    <Container>
        <FormWraper>
          <AddProductForm />
        </FormWraper>
    </Container>
    </div>
  )
}

export default ManageProducts
