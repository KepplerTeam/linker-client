import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import RightArrowIcon from '../icons/RightArrowIcon';
import HeartIcon from '../icons/HeartIcon';
import { Product } from '../../models';
import { useUser } from '../../hooks/useUser';
import { UPDATE_FAVORITES } from '../../graphql/mutations';
import useNotify from '../../hooks/useNotify';

interface ProductHomeInfoProps {
  name: string;
  images: string;
  _id: string;
  product?: Product;
}

export default function ProductHomeInfo({
  name = 'TMA-2 Modular Headphone',
  images,
  _id = '1',
  product,
}: ProductHomeInfoProps) {
  const router = useRouter();
  const [user] = useUser();
  const notify = useNotify();
  const [updateFavorites] = useMutation(UPDATE_FAVORITES);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [favorites] = React.useState([]);
  const [favoritesData, setFavoritesData] = React.useState([]);

  /** addToFavorites
   * @abstract Permite al usuario anadir productos a favoritos
   * @returns lista de productos en favoritos actualizada
   */
  const addToFavorites = async () => {
    try {
      // Extrae la informacion de favoritos del usuario y agrega en un array los id de cada producto
      setFavoritesData(user?.favorites?.products.map((a) => a._id));
      console.log('llegue 1');
      // Agrega a la lista creada anteriormente el id del producto que se desea anadir al carrito.
      favoritesData.push(product?._id);
      console.log(favoritesData);
      const { data: updateData } = await updateFavorites({
        variables: {
          filter: { _id: user?.favorites._id },
          record: {
            products: favoritesData,
          },
        },
      });
      if (updateData?.updateFavorites) {
        notify('Producto anadido a favoritos exitosamente', 'success');
      } else {
        console.log('me rompi aqui');
        notify(
          'Ha ocurrido un error al anadir el producto a favoritos',
          'error'
        );
      }
    } catch (err) {
      console.log('me rompi abajo');
      notify(err.message, 'error', err);
    }
  };

  const isNotFavorite = async () => {
    // Extrae la informacion de favoritos del usuario y agrega en un array los id de cada producto
    setFavoritesData(user?.favorites?.products.map((a) => a._id));
    if (favoritesData.includes(product?._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  React.useEffect(() => {
    isNotFavorite();
  }, [favorites]);

  /** removeFromFavorites
   * @abstract Permite al usuario eliminar productos de los favoritos
   * @param productId id del producto que desea eliminar de los favoritos
   */
  const removeFromFavorites = async () => {
    try {
      // currentFavorites es un arreglo que contiene el id de los productos existentes en favoritos
      const currentFavorites = user?.favorites?.products.map((p) => p._id);
      // newFavorites es el carrito actualizado, contiene el id de los productos anteriores pero sin el producto eliminado
      const newFavorites = findAndRemove(currentFavorites, product?._id);
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
    <>
      <div className="card items-center justify-between min-w-full mr-4">
        <div className="w-full h-full">
          <div className="flex flex-row justify-between w-full">
            <div className="w-1/2 z-20">
              <p className="font-bold break-normal">{name}</p>
            </div>
            {/* <div className="w-1/2">
                <img src={images} alt={name} className="w-full h-auto" />
			</div> */}
            {!isFavorite ? (
              <button
                type="button"
                className=""
                onClick={(e) => {
                  e.persist();
                  e.preventDefault();
                  addToFavorites();
                  isNotFavorite();
                }}
              >
                <HeartIcon className="w-6 h-6 text-gray-300 hover:text-gray-500 active:text-red-500" />
              </button>
            ) : (
              <button
                type="button"
                className=""
                onClick={(e) => {
                  e.persist();
                  e.preventDefault();
                  removeFromFavorites();
                  isNotFavorite();
                }}
              >
                <HeartIcon className="w-6 h-6 text-red-500 hover:text-red-700 active:text-gray-300" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/product/${_id}`);
            }}
          >
            <div className="flex flex-row w-full">
              <div className="ml-28 my-6 w-1/2">
                <img src={images} alt={name} className="w-full h-auto" />
              </div>
            </div>
            <div className="flex flex-row text-primary-100 space-x-2">
              <div className="">
                <h2 className="font-bold">Shop Now</h2>
              </div>
              <div>
                <RightArrowIcon className="w-4 h-4 mt-1" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
