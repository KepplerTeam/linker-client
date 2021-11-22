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
      <div className="bg-gray-50 shadow-lg hover:shadow-2xl rounded-xl p-6 mx-3 mb-4 flex flex-col w-80 min-w-max">
        <div className="w-full h-auto">
          {isSeller ? (
            <>
              <h2 className="font-semibold">Comprador: </h2>
              <h2>{bill?.client?.username}</h2>
            </>
          ) : null}
          <h2 className="font-semibold mt-4">Productos: </h2>
          {bill.products.map((product, idx) => (
            <div className="w-full" key={idx}>
              <div>
                <h2 className="">{product.name}</h2>
              </div>
            </div>
          ))}
          <h2 className="font-semibold mt-4">Fecha: </h2>
          <h2 className="text-base">{dayjs(bill?.createdAt).format('ll')}</h2>

          <div className="w-full mt-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Monto: </h2>
                <h2 className="text-right">${bill.totalPrice}</h2>
              </div>
              <button
                type="button"
                className="bg-gray-50 shadow-lg text-primary-100 font-semibold ring-primary-100 ring-2 hover:ring-0 px-8 py-2 rounded-lg hover:text-white hover:bg-primary-100 "
                onClick={() => router.push(`/order-details/${bill._id}`)}
              >
                Detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
