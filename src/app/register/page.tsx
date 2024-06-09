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

// "use client"
import Register from "@/components/Register";
import RegisterForm from "./RegisterForm";
import Container from '@/components/ui/container'
import FormWraper from '@/components/FormWraper'
import { getCurrentUser } from "../../../actions/getCurrentUser";

export default async function RegisterFormPage() {

    const currentUser = await getCurrentUser();

    return (
        <Container>
            <FormWraper>
                <RegisterForm currentUser={currentUser} />
                {/* <RegisterForm /> */}
            </FormWraper>

        </Container>
    )
}