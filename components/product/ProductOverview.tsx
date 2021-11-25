import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { Product, Review } from '../../models';
import ReviewCard from '../review/ReviewCard';
import { useUser } from '../../hooks/useUser';
import {
  UPDATE_SHOPPING_CART,
  UPDATE_FAVORITES,
  SET_REVIEW,
} from '../../graphql/mutations';
import Loading from '../common/Loading';
import { GET_REVIEWS } from '../../graphql/queries';
import useNotify from '../../hooks/useNotify';
import HeartIcon from '../icons/HeartIcon';
import StarsRating from '../review/StarsRating';
import { Input } from '../inputs';
import { StarIcon } from '../icons';

interface ProductOverviewProps {
  product?: Product;
  isReview?: boolean;
}

export default function ProductOverview({
  product,
  isReview = false,
}: ProductOverviewProps) {
  const [active, setActive] = React.useState(0);
  const router = useRouter();
  const [user] = useUser();
  const notify = useNotify();
  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART);
  const [updateFavorites] = useMutation(UPDATE_FAVORITES);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [favorites] = React.useState([]);
  const [favoritesData, setFavoritesData] = React.useState([]);
  const [reviewComment, setReviewComment] = React.useState('');
  const [rating, setRating] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [setReview] = useMutation(SET_REVIEW);

  const { data: reviewsData, loading: loadingReviewsData } = useQuery<{
    reviews: Review[];
  }>(GET_REVIEWS, {
    variables: {
      filter: { product: product?._id },
      limit: 4,
      sort: '_ID_DESC',
    },
    fetchPolicy: 'network-only',
  });

  /** addToCart
   * @abstract Permite al usuario anadir productos a su carrito de compras
   * @returns lista de productos en el shoppingCart actualizada
   */
  const addToCart = async () => {
    try {
      // Extrae la informacion del shoppingCart del usuario y agrega en un array los id de cada producto
      const shoppingCartData = user?.shoppingCart?.products.map((a) => a._id);
      // Agrega a la lista creada anteriormente el id del producto que se desea anadir al carrito.
      shoppingCartData.push(product?._id);
      const { data: updateData } = await updateShoppingCart({
        variables: {
          filter: { _id: user?.shoppingCart._id },
          record: {
            products: shoppingCartData,
          },
        },
      });
      if (updateData?.updateShoppingCart) {
        notify('Producto anadido al carrito exitosamente', 'success');
      } else {
        notify('Ha ocurrido un error al anadir el producto al carrito', 'err');
      }
    } catch (err) {
      notify(err.message, 'err', err);
    }
  };

  const onSubmitReview = async () => {
    try {
      if (rating !== null && reviewComment !== null) {
        const { data: reviewData } = await setReview({
          variables: {
            data: {
              createReviewInfoInput: {
                client: user?._id,
                product: product._id,
                enterprise: product?.enterprise?._id,
                productComment: reviewComment,
                productRating: rating,
              },
            },
          },
        });
        if (reviewData?.setReview) {
          notify('Tus comentarios ayudan a mejorar nuestra comunidad!', 'success');
          await router.push('/feed');
        } else {
          notify('Error calificando el producto', 'danger');
        }
      } else {
        notify('Debe completar la informacion', 'danger');
      }
    } catch (err) {
      notify(err.message, 'danger', err);
    }
  };

  /** addToFavorites
   * @abstract Permite al usuario anadir productos a favoritos
   * @returns lista de productos en favoritos actualizada
   */
  const addToFavorites = async () => {
    try {
      // Extrae la informacion de favoritos del usuario y agrega en un array los id de cada producto
      setFavoritesData(user?.favorites?.products.map((a) => a._id));
      // Agrega a la lista creada anteriormente el id del producto que se desea anadir al carrito.
      favoritesData.push(product?._id);
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
        notify('Ha ocurrido un error al anadir el producto a favoritos', 'err');
      }
    } catch (err) {
      notify(err.message, 'err', err);
    }
  };

  const isNotFavorite = async () => {
    // Extrae la informacion de favoritos del usuario y agrega en un array los id de cada producto
    setFavoritesData(user?.favorites?.products?.map((a) => a._id));
    if (favoritesData?.includes(product?._id)) {
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
      const currentFavorites = user?.favorites?.products?.map((p) => p._id);
      // newFavorites es pel carrito actualizado, contiene el id de los productos anteriores pero sin el producto eliminado
      const newFavorites = findAndRemove(currentFavorites, product?._id);
      const { data: updateData } = await updateFavorites({
        variables: {
          filter: { _id: user?.favorites?._id },
          record: {
            products: newFavorites,
          },
        },
      });
      if (updateData?.updateFavorites) {
        notify('Producto eliminado de favoritos exitosamente!', 'success');
      } else {
        notify('Ha ocurrido un error', 'danger');
      }
    } catch (err) {
      notify(err.message, 'danger', err);
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
    <div className="min-h-screen p-5 mx-4 my-5 rounded-2xl bg-gray-100 shadow-2xl">
      <div className="flex flex-col">
        <h2 className="text-2xl mt-2 mb-4 text-center font-bold">
          {product.name}
        </h2>
        <div className="flex flex-row mx-4 justify-between">
          <h2 className="mt-2 font-semibold text-primary-100">
            USD&nbsp;{product.price}
          </h2>
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
      </div>
      <div className="w-full max-w mt-5 pb-4">
        <Tab.Group>
          <Tab.List className="flex bg-gray-50 justify-center py-3 w-full shadow-inner rounded-xl">
            <Tab
              className={({ selected }) =>
                selected
                  ? 'bg-primary-100 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg'
                  : 'hover:bg-gray-100 font-bold px-5 py-3 rounded-xl hover:shadow-lg'
              }
            >
              Resumen
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? 'bg-primary-100 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg'
                  : 'hover:bg-gray-100 font-bold px-5 py-3 rounded-xl hover:shadow-lg'
              }
            >
              Especificaciones
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="mt-8">
              <div className="">
                <div className="w-full pb-4 flex flex-row overflow-scroll scrollbar-hide space-x-7">
                  {product.images.map((image, idx) => (
                    <div key={idx}>
                      <img
                        src={image}
                        alt={product.name}
                        className="w-full object-contain rounded-lg shadow-md"
                        key={product?._id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel className="py-4 px-3">
              <div className="">
                <h2 className="text-xl font-bold my-2">Vendedor:</h2>
                <button
                  className="text-primary-100 hover:underline"
                  type="button"
                  onClick={() =>
                    router.push(`/enterprise/${product.enterprise._id}`)
                  }
                >
                  <h2 className="text-primary-100">
                    {product.enterprise.name}
                  </h2>
                </button>
              </div>
              <div className="py-2">
                <h2 className="text-xl font-bold my-2">Descripción:</h2>
                <h2>{product.description}</h2>
              </div>
              <div className="py-2">
                <h2 className="text-xl font-bold my-2">Presentación:</h2>
                <h2>
                  {product.units === 0
                    ? 'El producto listado se vende por Unidades'
                    : ''}
                </h2>
                <h2>
                  {product.units === 1
                    ? 'El producto listado se vende por Kilogramos'
                    : ''}
                </h2>
                <h2>
                  {product.units === 2
                    ? 'El producto listado se vende por Litros'
                    : ''}
                </h2>
              </div>
              <div className="py-2">
                <h2 className="text-xl font-bold my-2">Serial:</h2>
                <h2>{product.serial}</h2>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div>
        {user?.role === 1 && !isReview ? (
          <div>
            <button
              type="button"
              className="bg-gray-50 shadow-lg font-medium text-black ring-primary-100 ring-2 hover:ring-0 my-3  px-8 py-2 rounded-lg hover:text-white hover:bg-primary-100 w-full"
              onClick={(e) => {
                e.persist();
                e.preventDefault();
                addToCart();
              }}
            >
              <span>Anadir al Carrito</span>
            </button>
          </div>
        ) : null}
        {user?.role === 2 &&
        user?._id === product?.enterprise?.owner?._id &&
        !isReview ? (
          <div className="w-full mb-4 text-center">
            <button
              type="button"
              className="bg-gray-50 shadow-lg font-medium text-black ring-primary-100 ring-2 hover:ring-0 my-3  px-8 py-2 rounded-lg hover:text-white hover:bg-primary-100"
              onClick={(e) => {
                e.persist();
                e.preventDefault();
                router.push(`/product/update/${product._id}`);
              }}
            >
              <span>Editar Producto</span>
            </button>
          </div>
        ) : null}

        <div className="mt-6 pt-4 px-3">
          {isReview ? (
            <div>
              <div className="mb-3">
                <h2 className="mb-1">¿Qué te pareció el producto?</h2>
                <StarsRating
                  setRating={setRating}
                  setHover={setHover}
                  rating={rating}
                  hover={hover}
                />
              </div>
              <div>
                <h2>Comentario</h2>
                <Input
                  type="comment"
                  id="comment"
                  name="comment"
                  placeholder=""
                  className="w-3/4 h-8 my-1 text-sm "
                  value={reviewComment}
                  setValue={setReviewComment}
                  label=""
                />
              </div>
              <motion.button
                whileHover={{
                  scale: 1.005,
                  boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
                }}
                value=""
                type="button"
                className="w-full h-11 bg-primary-100 text-white rounded-2xl px-4 py-2 my-12"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitReview();
                }}
              >
                <span>Enviar review</span>
              </motion.button>
            </div>
          ) : null}
          {loadingReviewsData ? (
            <div>
              <Loading />
            </div>
          ) : (
            <div>
              <div className="flex space-x-1">
                <h2 className="text-xl font-bold">Calificación:&nbsp; </h2>
                <div className="flex flex-row items-center">
                  <h2>{Math.round(product?.rating * 100) / 100}&nbsp;</h2>
                  <StarIcon className="w-5 text-yellow-300 fill-current" />
                </div>
              </div>
              {reviewsData?.reviews.map((review) => (
                <div key={review?._id} className="my-4">
                  <ReviewCard
                    name={review?.client.username}
                    rating={review?.productRating}
                    comment={review?.productComment}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
