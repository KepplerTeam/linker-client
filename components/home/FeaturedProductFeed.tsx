import React from 'react';
import { Product } from '../../models';
import FeaturedProduct from './FeaturedProduct';

interface FeaturedProductFeedProps {
  products?: Product[];
}

export default function FeaturedProductFeed({ products }) {
  return (
    <div className="flex scroll-x mb-4">
      {products.map((product) => (
        <FeaturedProduct
          name={product?.name}
          image={product?.images[0]}
          price={product?.price}
        />
      ))}
    </div>
  );
}
