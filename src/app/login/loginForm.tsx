"use client"

// import CustomInput from '@/components/CustomInput';
// import React, { useEffect, useState } from 'react';
// import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
// import { Button } from "@/components/ui/button"
// import Link from 'next/link';
// import Inputs from '@/components/Inputs';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { signIn, signOut } from 'next-auth/react';

// const LoginForm = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);

//     const router = useRouter();

//     const login = async () => {
//         setLoading(true);
//         const login = await signIn("credentials", {
//             email, password, redirect: false
//         })

//         if (login?.ok) {
//             toast.success("Correct login");
//             window.location.assign('/')
//         } else if (login?.error) {
//             toast.error(login?.error)
//         }
//         setLoading(false);
//     };

//     return (
//         <div className='flex flex-col justify-center space-y-5'>
//             <Button onClick={() => { signIn('google') }}>
//                 Continue with Google
//             </Button>
//             <Button onClick={() => { signIn('github') }}>
//                 Continue with GitHub
//             </Button>
//             <Inputs
//                 label="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//             />
//             <Inputs
//                 label="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//                 type='password'
//             />
//             <Button onClick={login} disabled={loading}>
//                 Login
//             </Button>
//             <p className='text-sm text-center p-2 mt-3'>Do not have an account? <Link href='/register' className='underline'>Sign up</Link></p>
//         </div>
//     )
// };

// export default LoginForm;


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const login = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });

        if (login?.ok) {
            toast.success("Correct login");
            window.location.assign('/');
        } else if (login?.error) {
            toast.error(login?.error);
        }
        setLoading(false);
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...register("email")}
                            className={errors.email ? "border-rose-400" : ""}
                        />
                        {errors.email && <p className="text-rose-400">{(errors.email.message as string)}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            className={errors.password ? "border-rose-400" : ""}
                        />
                        {errors.password && <p className="text-rose-400">{(errors.password.message as string)}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        Login
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => { signIn('github', { callbackUrl: "/" }) }}>
                        Login with GitHub
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => { signIn('google', { callbackUrl: "/" }) }}>
                        Login with Google
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default LoginForm;
