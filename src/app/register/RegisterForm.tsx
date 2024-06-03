"use client"

import CustomInput from '@/components/CustomInput';
import React, { useState } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import axios from 'axios'
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data).then(() => {
            toast.success('Account created');
            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if (callback?.ok) {
                    router.push('/');
                    // router.refresh();
                    // toast.success('Logged in');
                }
                if (callback?.error) {
                    toast.error(callback.error)
                }
            })
        }).catch(() => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        })

    };

    return (
        <form className="max-w-md mx-auto mt-4 p-4 border rounded-lg shadow-md">
            <Button className='outline' onClick={() => { }}>Sign in with Google</Button>
            <CustomInput id="name" disabled={isLoading} register={register} errors={errors} required placeholder="Name" />
            <CustomInput id="email" type="email" disabled={isLoading} register={register} errors={errors} required placeholder="Email" />
            <CustomInput id="password" type="password" disabled={isLoading} register={register} errors={errors} required placeholder="Password" />
            <Button type="submit" className="mt-4 w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 "
                onClick={handleSubmit(onSubmit)}>
                Register
            </Button>
            <p className='text-sm text-center p-2 mt-3'>Have an account? <Link href='/login' className='underline'>Log in</Link></p>
        </form>
    );
};

export default RegisterForm;
