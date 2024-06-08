// import Container from '@/components/ui/container'
// import React from 'react'
// import RegisterForm from './RegisterForm'
// import FormWraper from '@/components/FormWraper'


// const Register = () => {
//     return (
//         <Container>
//             <FormWraper>
//                 <RegisterForm />
//             </FormWraper>
//         </Container>
//     )
// }

// export default Register

import Register from "@/components/Register";
import RegisterForm from "./RegisterForm";
import Container from '@/components/ui/container'
import FormWraper from '@/components/FormWraper'
export default function RegisterFormPage() {
    return (
        <Container>
            <FormWraper>
                <RegisterForm />
            </FormWraper>

        </Container>
    )
}