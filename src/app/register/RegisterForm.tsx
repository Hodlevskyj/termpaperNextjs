"use client"

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { SafeUser } from '../../../types';

interface RegisterProps{
  currentUser:SafeUser | null
}

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" })
});

export function RegisterForm({ currentUser }: RegisterProps) {
// export function RegisterForm() {
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
    try {
      await axios.post("/api/register", data);
      toast.success("Successfully registered");
      router.push("/login");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data);
    } finally {
      setLoading(false);
    }
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
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Max"
              {...register("name")}
              className={errors.name ? "border-rose-400" : ""}
            />
            {errors.name && <p className="text-rose-400">{(errors.name.message as string)}</p>}
          </div>
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
            Create an account
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full mt-2 flex items-center justify-center"
          onClick={() => handleProviderLogin('github')}
          disabled={loading}
        >
          <FaGithub className="mr-2" /> Sign up with GitHub
        </Button>
        <Button
          variant="outline"
          className="w-full mt-2 flex items-center justify-center"
          onClick={() => handleProviderLogin('google')}
          disabled={loading}
        >
          <FaGoogle className="mr-2" /> Sign up with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;


