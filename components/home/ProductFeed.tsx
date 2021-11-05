import React from 'react';
import { Product } from '../../models';
import ProductHomeInfo from './ProductHomeInfo';

interface ProductFeedProps {
  products?: Product[];
}

export default function ProductFeed({ products }: ProductFeedProps) {
  return (
    <div className="flex scroll-x scrollbar-hide mb-4">
      {products.map((product) => (
        <div key={product?._id} className="flex h-full min-w-full mx-2 items-start">
          <ProductHomeInfo
            name={product?.name}
            images={product?.images[0]}
            _id={product?._id}
          />
        </div>
      ))}
    </div>
  );
}
