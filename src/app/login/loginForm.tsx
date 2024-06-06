"use client"

import CustomInput from '@/components/CustomInput';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import Inputs from '@/components/Inputs';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { signIn, signOut } from 'next-auth/react';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const login = async () => {
        setLoading(true);
        const login = await signIn("credentials", {
            email, password, redirect: false
        })

        if (login?.ok) {
            toast.success("Correct login");
            window.location.assign('/')
        } else if (login?.error) {
            toast.error(login?.error)
        }
        setLoading(false);
    };

    return (
        <div className='flex flex-col justify-center space-y-5'>
            <Button onClick={() => { signIn('google') }}>
                Continue with Google
            </Button>
            <Button onClick={() => { signIn('github') }}>
                Continue with GitHub
            </Button>
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
            <Button onClick={login} disabled={loading}>
                Login
            </Button>
            <p className='text-sm text-center p-2 mt-3'>Do not have an account? <Link href='/register' className='underline'>Sign up</Link></p>
        </div>
    )
};

export default LoginForm;
