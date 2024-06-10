"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { SafeUser } from "../../../types";

interface LoginProps{
    currentUser:SafeUser | null
  }

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export function LoginForm({currentUser}:LoginProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        if(currentUser){
          router.push('/');
          router.refresh();
        }
      },[])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const login = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });

        if (login?.ok) {
            toast.success("Correct login");
            // window.location.assign('/');
            router.push('/');
        } else if (login?.error) {
            toast.error(login?.error);
        }
        setLoading(false);
    };

    const handleProviderLogin = async (provider: string) => {
        setLoading(true);
        try {
            await signIn(provider, { callbackUrl: "/" });
        } finally {
            setLoading(false);
        }
    };
    if(currentUser){
        return <p className='text-center'>Redirecting...</p>
      }

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
                </form>
                <Button
                    variant="outline"
                    className="w-full mt-2 flex items-center justify-center"
                    onClick={() => handleProviderLogin('github')}
                >
                    <FaGithub className="mr-2" /> Login with GitHub
                </Button>
                <Button
                    variant="outline"
                    className="w-full mt-2 flex items-center justify-center"
                    onClick={() => handleProviderLogin('google')}
                >
                    <FaGoogle className="mr-2" /> Login with Google
                </Button>
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

