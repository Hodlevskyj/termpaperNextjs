import prisma from '../../../../libs/prismadb'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '../../../../actions/getCurrentUser';

export async function POST(request: Request) {
    const currentUser=await getCurrentUser();

    if(!currentUser || currentUser.role !=='ADMIN')
        return NextResponse.error()
    
    try {
        const body = await request.json();
        const { name, description, price,brand,category,inStock,images } = body

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price:parseFloat(price),
                brand,
                category,
                inStock,
                images
            }
        });

        return NextResponse.json(product);
        
    } catch (err: any) {
        console.log("PRODUCT ERROR: ", err)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
    
}

export async function PUT(request:Request){
    const currentUser=await getCurrentUser();

    if(!currentUser || currentUser.role !=='ADMIN')
        return NextResponse.error()
    
    const body = await request.json()
    const {id,inStock}=body

    const product = await prisma.product.update({
        where:{id:id},
        data:{inStock},
    });
    return NextResponse.json(product);

}
