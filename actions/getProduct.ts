import prisma from "../libs/prismadb";

export interface IProductParams {
    category?: string | null;
    searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm } = params;
        let searchString = searchTerm ?? '';

        let query: any = {};

        if (category) {
            query.category = category;
        }

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        }
                    }
                ]
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

        return products;
    } catch (err: any) {
        console.log("Error", err);
        return [];
    }
}
