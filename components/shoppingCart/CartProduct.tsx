import { useMutation } from '@apollo/client';
import React from 'react';
import { UPDATE_SHOPPING_CART } from '../../graphql/mutations';
import useNotify from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import { Product } from '../../models';
import { TrashIcon } from '../icons';

interface CartProductProps {
  product?: Product;
}

export default function CartProduct({ product }: CartProductProps) {
  const [user] = useUser();
  const notify = useNotify();
  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART);
  const [cart] = React.useState(user.shoppingCart.products);
  const removeProduct = async (productId) => {
    try {
      const currentCart = user?.shoppingCart?.products.map((p) => p._id);
      const newCart = findAndRemove(currentCart, productId);
      const { data: updateData } = await updateShoppingCart({
        variables: {
          filter: { _id: user?.shoppingCart._id },
          record: {
            products: newCart,
          },
        },
      });
      if (updateData?.updateShoppingCart) {
        notify('Producto eliminado del carrito exitosamente!', 'success');
      } else {
        notify('Ha ocurrido un error', 'error');
      }
    } catch (err) {
      notify(err.message, 'error', err);
    }
  };

  React.useEffect(() => {}, [cart]);

  const findAndRemove = (arr, value) => {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };
  return (
    <div className="card flex flex-row px-8 items-center justify-center w-full">
      <img
        className="h-32 w-auto p-4 bg-gray-100 rounded-3xl"
        src={product?.images[0]}
        alt={product?.name}
      />
      <div className="py-5 pl-5 flex flex-col items-start h-full w-full">
        <h4 className="text-l font-light mb-auto">{product?.name}</h4>
        <h5 className="text-sm font-bold mb-3">${product?.price}</h5>
        <div className="flex flex-row items-center justify-between w-full">
          <button type="button" className="ml-auto">
            <TrashIcon
              className="w-5 h-5 opacity-50"
              onClick={() => removeProduct(product?._id)}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
