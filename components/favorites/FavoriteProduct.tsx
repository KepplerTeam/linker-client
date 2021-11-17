import { useMutation } from '@apollo/client';
import React from 'react';
import { UPDATE_FAVORITES } from '../../graphql/mutations';
import useNotify from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import { Product } from '../../models';
import { TrashIcon } from '../icons';

interface FavoriteProductProps {
  product?: Product;
}

export default function FavoriteProduct({ product }: FavoriteProductProps) {
  const [user] = useUser();
  const notify = useNotify();
  const [updateFavorites] = useMutation(UPDATE_FAVORITES);

  // Estado para validar en el useEffect cuando cambia la data y recargar el componente
  const [favorites] = React.useState(user.favorites.products);

  /** removeProduct
   * @abstract Permite al usuario eliminar productos de los favoritos
   * @param productId id del producto que desea eliminar de los favoritos
   */
  const removeProduct = async (productId) => {
    try {
      // currentFavorites es un arreglo que contiene el id de los productos existentes en favoritos
      const currentFavorites = user?.favorites?.products.map((p) => p._id);
      // newFavorites es el carrito actualizado, contiene el id de los productos anteriores pero sin el producto eliminado
      const newFavorites = findAndRemove(currentFavorites, productId);
      const { data: updateData } = await updateFavorites({
        variables: {
          filter: { _id: user?.favorites._id },
          record: {
            products: newFavorites,
          },
        },
      });
      if (updateData?.updateFavorites) {
        notify('Producto eliminado de favoritos exitosamente!', 'success');
      } else {
        notify('Ha ocurrido un error', 'error');
      }
    } catch (err) {
      notify(err.message, 'error', err);
    }
  };

  React.useEffect(() => {}, [favorites]);

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
