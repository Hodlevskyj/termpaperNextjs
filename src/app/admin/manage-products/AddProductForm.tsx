"use client"
import Heading from '@/components/Heading'
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaGithub } from 'react-icons/fa';

const AddProductForm = () => {
  return (
    <div>
      <Heading title="Add Product" center />
      <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form  className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Max"
              
              
            />
            
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Description</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              
            />
            
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Brand</Label>
            <Input
              id="password"
              type="password"

            />

          </div>
          <Button type="submit" className="w-full">

          </Button>
        </form>

      </CardContent>
    </Card>
    </div>
  )
}

export default AddProductForm
