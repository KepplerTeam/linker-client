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
  const router = useRouter();
  const notify = useNotify();
  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART);
  const [createBill] = useMutation(CREATE_BILL);
  const [updateUser] = useMutation(UPDATE_USER);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (user?.shoppingCart?.products.length < 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, []);

  /**
   * @abstract Se encarga del proceso de compra del usuario: primero se crea la factura, si esto se logra entonces descontamos el monto del balance del usuario, posteriormente vaciamos el carro de compras
   */
  const onSubmit = async () => {
    try {
      const cartContent = user?.shoppingCart?.products.map((p) => p._id);
      let uniqueEnterpriseProducts = [];

      if (user?.balance >= totalPrice) {
        //   Se crea la factura en la bd
        const productOwners = user?.shoppingCart?.products.map(
          (p) => p?.enterprise?._id
        );

        // Separa los productos por empresa y crea una factura por empresa para facilitar el pago al proveedor.
        const handleBillDivision = () => {
          const ownersLenght = productOwners.length;
          const uniqueEnterprises = [];
          // eslint-disable-next-line no-plusplus
          for (let x = 0; x < ownersLenght; x++) {
            if (
              uniqueEnterprises.includes(
                user?.shoppingCart?.products[x].enterprise._id
              )
            ) {
              console.log('empresa ya existente');
            } else {
              uniqueEnterprises.push(
                user?.shoppingCart?.products[x].enterprise._id
              );
            }
          }
          return uniqueEnterprises;
        };
        const newUniqueBill = async (uniqueEnterprises) => {
          // eslint-disable-next-line no-plusplus
          for (let x = 0; x < uniqueEnterprises.length; x++) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < cartContent.length; i++) {
              if (
                uniqueEnterprises[x] ===
                user?.shoppingCart?.products[i].enterprise._id
              ) {
                uniqueEnterpriseProducts.push(user?.shoppingCart?.products[i]);
              }
            }
            const totalBillPrice = uniqueEnterpriseProducts.reduce(
              (sum, { price }) => sum + price,
              0
            );
            const enterpriseId = uniqueEnterprises[x];
            const { data: billData } = await createBill({
              variables: {
                data: {
                  createBillInfoInput: {
                    client: user?._id,
                    enterprise: enterpriseId,
                    totalPrice: Math.round(totalBillPrice * 100) / 100,
                  },
                  addingProducts: uniqueEnterpriseProducts.map((p) => p._id),
                },
              },
            });
            if (billData.createBill) {
              // Se actualiza el balance del usuario
              const { data: userData } = await updateUser({
                variables: {
                  filter: { _id: user?._id },
                  record: {
                    balance: user?.balance - totalBillPrice,
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
                  console.log('buena esa crack');
                  uniqueEnterpriseProducts = [];
                } else {
                  notify('error', 'danger');
                }
              } else {
                notify('Ha ocurrido un error 2', 'danger');
              }
            } else {
              notify('Ha ocurrido un error 3', 'danger');
            }
          }
        };
        const billDivision = handleBillDivision();
        newUniqueBill(billDivision);
        await notify('Felicidades por su compra!', 'success');
        router.push('/feed');
      } else {
        notify('Balance insuficiente para realizar la compra,', 'danger');
        notify('Recargue su wallet en su perfil', 'warning');
      }
    } catch (error) {
      notify(error.message, 'danger', error);
    }
  };

  const totalPrice = user?.shoppingCart?.products?.reduce(
    (sum, { price }) => sum + price,
    0
  );

  return (
    <div className="min-h-screen">
      <CheckoutInfo totalPrice={totalPrice} />
      <div className="flex w-full mb-28 justify-center mt-24 fixed bottom-0">
        <button
          type="button"
          className={`mt-8 px-10 py-3  font-bold shadow-lg rounded-lg ${
            disabled
              ? 'bg-gray-200 text-gray-300'
              : 'bg-primary-100 hover:bg-primary-600 text-white'
          }`}
          disabled={disabled}
          onClick={() => onSubmit()}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
