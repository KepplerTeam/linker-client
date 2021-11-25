import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../hooks/useUser';
import CartProduct from '../shoppingCart/CartProduct';

interface CheckoutInfoProps {
  totalPrice: number;
}

export default function CheckoutInfo({ totalPrice = 0 }: CheckoutInfoProps) {
  const [user] = useUser();
  return (
    <div>
      <div>
        <div className="bg-gray-100 flex justify-center">
          <h2 className="font-semibold text-2xl p-4">Procesar orden</h2>
        </div>
        <div className="border-t-2 shadow-inner p-6 pb-48">
          <h2 className="my-4 text-lg font-semibold">Confirme su orden para proceder.</h2>
          <div>
            <p className="mb-2">Recuerde ver los detalles de la factura en su perfil.</p>
            <p>¡Déjenos saber su opinión luego de recibir el producto!</p>
          </div>
          <div className="flex flex-row space-x-2 bg-gray-100 rounded-xl p-2 text-center mt-12">
            <h2 className="font-bold">
              Saldo disponible:{' '}
              <span className="text-primary-100 font-bold">
                ${Math.round(user?.balance)}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
