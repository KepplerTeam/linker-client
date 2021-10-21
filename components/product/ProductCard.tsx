import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Product } from '../../models';
import StarIcon from '../icons/StarIcon';

interface ProductCardProps {
  products: Product[];
}
export default function ProductCard({ products }: ProductCardProps) {
  const router = useRouter();
  return (
    <div className="px-1 min-h-screen">
      <div className="bg-gray-100 p-3 pb-5 w-full grid grid-cols-2 rounded-2xl gap-4">
        {products.map((product) => (
          <div className="bg-white rounded-2xl p-3" key={product?._id}>
            <div className="flex flex-col">
              <motion.button
                className="text-left"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/stock/${product._id}`);
                }}
              >
                <div className="mb-1">
                  <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="w-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-lg font-light">{product?.name}</p>
                  <p className="font-bold text-sm">USD{product?.price}</p>
                </div>
                <div className="flex flex-row justify-between mt-2">
                  <div className="flex">
                    <StarIcon className="w-4 h-4 text-yellow-300 fill-current mr-2" />
                    <div className="text-sm">{product?.rating} 4.2</div>
                  </div>
                  <div>
                    <p className="text-sm">86 Reviews</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
