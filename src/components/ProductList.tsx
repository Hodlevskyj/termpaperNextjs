import React from 'react';
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "../types/product";
import getProducts, { IProductParams } from '../../actions/getProduct';

interface ProductListProps {
  searchParams: IProductParams;
}

const ProductList = async ({ searchParams }: ProductListProps) => {
  const products = await getProducts(searchParams);

  if (!products || products.length === 0) return <p>No products</p>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
