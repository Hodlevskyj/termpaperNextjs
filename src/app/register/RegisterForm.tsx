"use client"

import CustomInput from '@/components/CustomInput';
import React, { useState } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
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
            <CustomInput id="name" disabled={isLoading} register={register} errors={errors} required placeholder="Name" />
            <CustomInput id="email" type="email" disabled={isLoading} register={register} errors={errors} required placeholder="Email" />
            <CustomInput id="password" type="password" disabled={isLoading} register={register} errors={errors} required placeholder="Password" />
            <Button type="submit" className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={handleSubmit(onSubmit)}>
                Register
            </Button>
            <p className='text-sm text-center p-2 mt-3'>Have an account? <Link href='/login' className='underline'>Log in</Link></p>
        </form>
    );
};

export default RegisterForm;
