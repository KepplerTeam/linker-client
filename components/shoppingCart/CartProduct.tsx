import { useMutation } from '@apollo/client';
import React from 'react';
import { UPDATE_SHOPPING_CART } from '../../graphql/mutations';
import useNotify from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import { Product } from '../../models';
import { TrashIcon } from '../icons';

interface CartProductProps {
  product?: Product;
  hasTrashIcon?: boolean;
}

export default function CartProduct({
  product,
  hasTrashIcon = false,
}: CartProductProps) {
  const [user] = useUser();
  const notify = useNotify();
  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART);

  // Estado para validar en el useEffect cuando cambia la data y recargar el componente
  const [cart] = React.useState(user.shoppingCart.products);

  /** removeProduct
   * @abstract Permite al usuario eliminar productos de su carrito de compras
   * @param productId id del producto que desea eliminar del carrito de compras
   */
  const removeProduct = async (productId) => {
    try {
      // currentCart es un arreglo que contiene el id de los productos existentes en el carrito
      const currentCart = user?.shoppingCart?.products.map((p) => p._id);
      // newCart es el carrito actualizado, contiene el id de los productos anteriores pero sin el producto eliminado
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
        notify('Ha ocurrido un error', 'danger');
      }
    } catch (err) {
      notify(err.message, 'danger', err);
    }
  };

  React.useEffect(() => {
    console.log('');
  }, [cart]);

  /**
   * findAndRemove
   * @param arr arreglo en el que se desea buscar
   * @param value valor que desea buscarse en el arreglo
   * @returns array sin el elemento eliminado
   */
  const findAndRemove = (arr, value) => {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };
  return (
    <div className="card bg-gray-50 flex flex-row mb-6 items-center justify-between">
      <img
        className="h-32 w-32 p-3 rounded-3xl"
        src={product?.images[0]}
        alt={product?.name}
      />
      <div className="ml-3 flex flex-col items-start h-full w-full">
        <h4 className="text-lg font-bold mb-2">{product?.name}</h4>
        <div className="flex flex-row items-center justify-between w-full">
          <h5 className="text-md text-primary-700 font-bold">
            ${product?.price}
          </h5>
          {hasTrashIcon ? (
            <button type="button" className="ml-auto">
              <TrashIcon
                className="w-6 h-6 opacity-50 hover:opacity-100"
                onClick={() => removeProduct(product?._id)}
              />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
