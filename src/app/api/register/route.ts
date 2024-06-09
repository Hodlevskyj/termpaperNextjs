import bcrypt from 'bcryptjs'
import prisma from '../../../../libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    
    try {
        const body = await request.json();
        const { name, email, password } = body

        if (!email || !password) {
            return new NextResponse("Invalid email or password", { status: 400 });
        }

        // const userAlreadyExist = await prisma.user.findFirst({
        const userAlreadyExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        


        if (userAlreadyExist) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                hashedPassword: hashedPassword,
            }
        });
        console.log("newUser->",newUser)

        return NextResponse.json(newUser);
        
    } catch (err: any) {
        console.log("Register ERROR: ", err)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
    
}
