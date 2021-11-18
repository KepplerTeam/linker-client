import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useRouter } from 'next/router';
import React from 'react';
import { Bill } from '../../models';

interface OrderResumeProps {
  bill: Bill;
}

export default function OrdersResume({ bill }: OrderResumeProps) {
  const router = useRouter();
  dayjs.extend(localizedFormat);
  return (
    <>
      <div className="bg-gray-100 rounded-xl p-4 mx-3 flex flex-col w-80 min-w-max">
        <div className="w-full h-auto">
          {bill.products.map((product, idx) => (
            <div className="w-full" key={idx}>
              <div>
                <h2>{product.name}</h2>
                <h2 className="text-sm mt-1">
                  {dayjs(bill?.createdAt).format('ll')}
                </h2>
              </div>
            </div>
          ))}
          <div className="w-full mt-1">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push(`/order-details/${bill._id}`)}
              >
                <h2 className="text-primary-100">Detalles</h2>
              </button>
              <div>
                <h2 className="text-right">${bill.totalPrice}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
