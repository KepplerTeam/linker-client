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
        <h2 className="text-xl text-primary-100 font-bold">Procesar orden</h2>
        <h2 className="mt-4 text-gray-600">Orden completa</h2>
        <div>
          <p>Recuerde ver los detalles de la factura en su perfil</p>
          <p>Dejenos saber su opinion luego de recibir el producto!</p>
        </div>
        <div className="flex flex-row space-x-2 bg-gray-100 rounded-xl px-2 text-center mt-12">
          <h2 className="text-gray-600">
            Saldo disponible:{' '}
            <span className="text-primary-100 font-bold">
              ${Math.round(user?.balance)}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
