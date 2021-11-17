import React from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import CheckoutInfo from './CheckoutInfo';
import useNotify from '../../hooks/useNotify';
import {
  CREATE_BILL,
  UPDATE_SHOPPING_CART,
  UPDATE_USER,
} from '../../graphql/mutations';
import { useUser } from '../../hooks/useUser';

export default function CheckoutPageComponent() {
  const [user] = useUser();
  const notify = useNotify();
  const router = useRouter();
  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART);
  const [createBill] = useMutation(CREATE_BILL);
  const [updateUser] = useMutation(UPDATE_USER);

  /**
   * @abstract Se encarga del proceso de compra del usuario: primero se crea la factura, si esto se logra entonces descontamos el monto del balance del usuario, posteriormente vaciamos el carro de compras
   */
  const onSubmit = async () => {
    try {
      const cartContent = user?.shoppingCart?.products.map((p) => p._id);
      if (user?.balance >= totalPrice) {
        //   Se crea la factura en la bd
        const { data: billData } = await createBill({
          variables: {
            data: {
              createBillInfoInput: {
                client: user?._id,
                enterprise: user?.shoppingCart?.products[0].enterprise?._id,
                totalPrice: Math.round(totalPrice * 100) / 100,
              },
              addingProducts: cartContent,
            },
          },
        });
        if (billData.createBill) {
          // Se actualiza el balance del usuario
          const { data: userData } = await updateUser({
            variables: {
              filter: { _id: user?._id },
              record: {
                balance: user?.balance - totalPrice,
              },
            },
          });
          if (userData.updateUser) {
            //   Se vacia el carrito de compras
            const { data: shoppingCartData } = await updateShoppingCart({
              variables: {
                filter: { _id: user?.shoppingCart?._id },
                record: {
                  products: null,
                },
              },
            });
            if (shoppingCartData.updateShoppingCart) {
              notify('Felicidades por su compra!', 'success');
            } else {
              notify('Ha ocurrido un error 1', 'error');
            }
          } else {
            notify('Ha ocurrido un error 2', 'error');
          }
        } else {
          notify('Ha ocurrido un error 3', 'error');
        }
      } else {
        notify('Balance insuficiente para realizar la compra', 'error');
      }
    } catch (error) {
      notify(error.message, 'error', error);
    }
  };

  const totalPrice = user?.shoppingCart?.products?.reduce(
    (sum, { price }) => sum + price,
    0
  );
  return (
    <div className="min-h-screen p-4">
      <CheckoutInfo totalPrice={totalPrice} />
      <div className="mt-24">
        <motion.button
          className="bg-primary-100 rounded-full px-3 py-2 w-full text-white font-bold"
          onClick={() => onSubmit()}
        >
          Confirmar
        </motion.button>
      </div>
    </div>
  );
}
