import React from 'react';
import { Product } from '../../models';
import FeaturedProduct from './FeaturedProduct';

interface FeaturedProductFeedProps {
  products?: Product[];
}

export default function FeaturedProductFeed({
  products,
}: FeaturedProductFeedProps) {
  return (
    <div className="flex scroll-x mb-4 scrollbar-hide">
      {products.map((product) => (
        <div key={product?._id}>
          <FeaturedProduct
            name={product?.name}
            images={product?.images[0]}
            price={product?.price}
            _id={product?._id}
          />
        </div>
      ))}
    </div>
  );
}
