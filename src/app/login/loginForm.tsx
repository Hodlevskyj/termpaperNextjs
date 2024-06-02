"use client"

import CustomInput from '@/components/CustomInput';
import React, { useState } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
        // setIsLoading(false);
    };

    return (
        <form className="max-w-md mx-auto mt-4 p-4 border rounded-lg shadow-md">
            <Button className='outline' onClick={()=>{}}>Continue with Google</Button>
            <CustomInput id="email" type="email" disabled={isLoading} register={register} errors={errors} required placeholder="Email" />
            <CustomInput id="password" type="password" disabled={isLoading} register={register} errors={errors} required placeholder="Password" />
            <Button type="submit" className="mt-4 w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2"
                onClick={handleSubmit(onSubmit)}>
                Log in
            </Button>
            <p className='text-sm text-center p-2 mt-3'>Do not have an account? <Link href='/register' className='underline'>Sign up</Link></p>
        </form>
    );
};

export default LoginForm;
