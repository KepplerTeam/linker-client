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
    // TODO Meterle el diseno completo
    <div className="min-h-screen p-4">
      {user?._id === bill?.enterpriseOwner._id ? (
        <h2>Resumen de venta</h2>
      ) : null}
      {user?._id === bill?.client?._id ? <h2>Resumen de compra</h2> : null}
      <div>
        {user?._id !== bill?.enterpriseOwner._id &&
        user?._id !== bill?.client?._id ? (
          <div>
            <h2>No tiene permiso para ver esta pagina.</h2>
          </div>
        ) : (
          <div>
            {bill.products.map((product) => (
              <div>
                <div>
                  <h2>{product.name}</h2>
                  <h2>Precio del producto: ${product.price}</h2>
                  <h2>Total pagado: ${bill.totalPrice}</h2>
                </div>
              </div>
            ))}
            <h2>Fecha de compra: {dayjs(bill?.createdAt).format('ll')}</h2>
            <div className="mt-4">
              <motion.button
                className="bg-primary-100 hover:bg-primary-600 shadow-md hover:shadow-2xl rounded-3xl px-6 py-2 text-white font-bold"
                onClick={() => router.push(`/review/${bill._id}`)}
              >
                Valorar Compra
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
