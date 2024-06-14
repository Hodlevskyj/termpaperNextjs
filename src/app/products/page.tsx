// 'use client'
// import Container from '@/components/ui/container';
// import React, { useState, useEffect } from 'react';
// import { Input } from "@/components/ui/input";

// import CustomInput from '@/components/CustomInput';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import queryString from 'query-string';
// import { ProductList } from '@/components/ProductList';

// const Productspage = () => {

//     const router = useRouter()
//     const {register,handleSubmit,reset, formState:{errors}}=useForm<FieldValues>({
//         defaultValues:{
//             searchTerm:''
//         }
//     })

//     const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
//         if(!data.searchTerm) return router.push('/')

//         const url=queryString.stringifyUrl({
//             url:'/',
//             query:{
//                 searchTerm:data.searchTerm
//             }
//         },{
//             skipNull:true
//         })
//         router.push(url)
//         reset()
//     }
//     return (
//         <Container>
//             <div className="pb-3">
//                 {/* <CustomInput */}
//                 <Input
//                     {...register('searchTerm')}
//                     type="text"
//                     placeholder="Search products..."
//                     className="w-full sm:w-64 md:w-48 lg:w-64"
//                     required
//                 />
//                 <Button onClick={handleSubmit(onSubmit)}>Search</Button>
//             </div>
//             <ProductList searchParams={{}}/>
//         </Container>
//     );
// };

// export default Productspage;


