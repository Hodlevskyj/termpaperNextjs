import React from 'react'
import Container from '@/components/ui/container'
import FormWraper from '@/components/FormWraper'
import LoginForm from './loginForm'
import { getCurrentUser } from '../../../actions/getCurrentUser'

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
        <FormWraper>
            <LoginForm currentUser={currentUser}/>
        </FormWraper>
      
    </Container>
  )
}

export default Login
