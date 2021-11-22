import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { Bill } from '../../models';

interface ReviewsPageComponentProps {
  bill: Bill;
}

export default function ReviewsPageComponent({
  bill,
}: ReviewsPageComponentProps) {
  const router = useRouter();
  return (
    <div>
      {bill.products.map((product) => (
        <div className="flex flex-row">
          <div>
            <h2>{product.name}</h2>
            <h2>${product.price}</h2>
          </div>
          <div>
            <motion.button
              className="bg-primary-100 hover:bg-primary-600 shadow-md hover:shadow-2xl rounded-2xl px-3 py-2 text-white font-bold"
              onClick={() => router.push(`/product/review/${product._id}`)}
            >
              Rate Product
            </motion.button>
          </div>
        </div>
      ))}
    </div>
  );
}
