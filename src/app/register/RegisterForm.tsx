"use client"

import CustomInput from '@/components/CustomInput';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import axios from 'axios'
import toast from 'react-hot-toast';
import { signIn, signOut } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation';
import Inputs from '@/components/Inputs';

const RegisterForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const register = async () => {
        setLoading(true);
        try {
            await axios.post("/api/register", {
                name, email, password
            });

            toast.success("Successfully registered");
            router.push("/login")
        } catch (err: any) {
            console.log(err);
            toast.error(err?.response?.data)

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col justify-center space-y-5'>
            <Button onClick={() => { signIn('google',{callbackUrl:"/"}) }}>
                Continue with Google
            </Button>
            <Button onClick={() => { signIn('github',{callbackUrl:"/"}) }}>
                Continue with GitHub
            </Button>
            <Inputs
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
            />
            <Inputs
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />
            <Inputs
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                type='password'
            />
            <Button
                onClick={register}
                disabled={loading}
            >
                Register
            </Button>
            <p className='text-sm text-center p-2 mt-3'>Have an account? <Link href='/login' className='underline'>Log in</Link></p>
        </div>
    );
};

export default RegisterForm;


