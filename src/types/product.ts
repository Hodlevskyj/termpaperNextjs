// export interface ColorAndProductImgs{
//     color:string;
//     colorCode:string;
//     image:string;
// }
export interface Image {
  image: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: null | boolean;
    image: string;
    hashedPassword: null | string;
    createdAt: string;
    updatedAt: string;
    role: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  mainImage: string;
  images: Image[];
  reviews: Review[];
  quantity: number;
}

