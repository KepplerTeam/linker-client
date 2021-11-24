import React from 'react';
import { useQuery } from '@apollo/client';
import ProductFeed from './ProductFeed';
import FeaturedProductFeed from './FeaturedProductFeed';
import { Product } from '../../models';
import CategorySelector from '../common/CategorySelector';

interface CardHomeProps {
  allProducts?: Product[];
  featuredProducts?: Product[];
  category?: number;
  setCategory?: React.Dispatch<React.SetStateAction<number>>;
}

export default function CardHome({
  allProducts,
  featuredProducts,
  category = 0,
  setCategory,
}: CardHomeProps) {
  return (
    <div className="card-home">
      <div>
        <div className="my-3">
          <CategorySelector category={category} setCategory={setCategory} />
        </div>
        <div className="pr-4">
          <ProductFeed products={allProducts} />
        </div>
        <div className="flex justify-between mb-2 pr-4">
          <h3 className="text-lg font-semibold pb-2">Productos Destacados</h3>
        </div>
        <div className="">
          <FeaturedProductFeed products={featuredProducts} />
        </div>
      </div>
    </div>
  );
}
