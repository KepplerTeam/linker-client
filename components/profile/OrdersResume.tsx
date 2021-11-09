import { useRouter } from 'next/router';
import React from 'react';

export default function OrdersResume({ prueba }) {
  const router = useRouter();
  return (
    <>
      <div className="bg-gray-100 rounded-xl p-4 mx-3 flex flex-col w-80 min-w-max">
        <div className="w-full h-auto">
          {prueba.product.map((product, idx) => (
            <div className="w-full" key={idx}>
              <div>
                <h2>{product.name}</h2>
              </div>
            </div>
          ))}
          <div className="w-full mt-2">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push(`/order-details/${prueba._id}`)}
              >
                <h2 className="text-primary-100">Detalles</h2>
              </button>
              <div>
                <h2 className="text-right">${prueba.totalPrice}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
