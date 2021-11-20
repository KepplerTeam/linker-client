import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useRouter } from 'next/router';
import React from 'react';
import { Bill } from '../../models';

interface OrderResumeProps {
  bill: Bill;
  isSeller?: boolean;
}

export default function OrdersResume({
  bill,
  isSeller = false,
}: OrderResumeProps) {
  const router = useRouter();
  dayjs.extend(localizedFormat);
  return (
    <>
      <div className="bg-gray-50 shadow-lg hover:shadow-2xl rounded-xl p-4 mx-3 mb-4 flex flex-col w-80 min-w-max">
        <div className="w-full h-auto">
          {isSeller ? <h2>Comprador: {bill?.client?.username}</h2> : null}
          {bill.products.map((product, idx) => (
            <div className="w-full" key={idx}>
              <div>
                <h2 className="font-semibold">{product.name}</h2>
              </div>
            </div>
          ))}
          <h2 className="text-base mt-1">
            {dayjs(bill?.createdAt).format('ll')}
          </h2>
          <div className="w-full mt-1">
            <div className="flex justify-between">
              <div>
                <h2 className="text-right">${bill.totalPrice}</h2>
              </div>
              <button
                type="button"
                className="hover:shadow-md py-2 px-4 rounded-2xl hover:bg-gray-100"
                onClick={() => router.push(`/order-details/${bill._id}`)}
              >
                <h2 className="text-primary-100 font-semibold">Detalles</h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
