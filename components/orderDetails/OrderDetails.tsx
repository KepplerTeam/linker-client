import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Bill } from '../../models';

interface OrderDetailsProps {
  bill: Bill;
  // bill;
}

export default function OrderDetails({ bill }: OrderDetailsProps) {
  const [user] = useUser();
  const router = useRouter();
  dayjs.extend(localizedFormat);
  return (
    <div className="min-h-screen">
      {user?._id === bill?.enterpriseOwner._id ? (
        <h2 className="text-center text-2xl font-semibold py-6">
          Resumen de venta
        </h2>
      ) : null}
      {user?._id === bill?.client?._id ? (
        <h2 className="text-center text-2xl font-semibold py-6">
          Resumen de compra
        </h2>
      ) : null}
      <div>
        {user?._id !== bill?.enterpriseOwner._id &&
        user?._id !== bill?.client?._id ? (
          <div>
            <h2 className="text-center text-xl font-bold my-10">
              No tiene permiso para ver esta pagina.
            </h2>
          </div>
        ) : (
          <>
            <div className="py-5 border-t-2 shadow-inner">
              {bill.products.map((product) => (
                <div className="p-5 m-6 rounded-2xl bg-gray-100 shadow-lg hover:shadow-2xl ">
                  <div>
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <div className="flex flex-row items-center py-2">
                      <h2 className="text-lg font-bold my-2">
                        Precio del producto:&nbsp;
                      </h2>
                      <h2>${product.price}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 pb-10 mt-36 px-8 border-t-2 shadow-inner bg-gray-100">
              <div className="flex flex-row items-center py-2">
                <h2 className="text-lg font-bold my-2">TOTAL:&nbsp;</h2>
                <h2>${bill.totalPrice}</h2>
              </div>
              <div className="flex flex-row items-center pb-2">
                <h2 className="text-lg font-bold my-2">
                  FECHA:&nbsp;
                </h2>
                <h2>{dayjs(bill?.createdAt).format('ll')}</h2>
              </div>
              <div className="flex justify-center items-center mt-4">
                <button
                  className="bg-primary-100 hover:bg-primary-600 shadow-md hover:shadow-3xl rounded-xl px-6 py-2 text-white font-bold"
                  onClick={() => router.push(`/review/${bill._id}`)}
                >
                  Valorar Compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
