import prisma from '../libs/prismadb'

interface IParams {
    id?: string;
}

export default async function getProductById(params: IParams) {
    try {
        const { id } = params;
        const product = await prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createAt: 'desc'
                    }
                }
            }
        });
        if (!product) return null;
        return product;
    } catch (err: any) {
        console.log("error", err);
        return null;
    }
}
