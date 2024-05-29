// export interface ColorAndProductImgs{
//     color:string;
//     colorCode:string;
//     image:string;
// }
export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    brand: string;
    category: string;
    inStock: boolean;
    mainImage: string;
    images: string;
    reviews: { }[];
    quantity:number;
  }
  