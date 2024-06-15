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