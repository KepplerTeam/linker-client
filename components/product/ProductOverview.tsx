import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Product } from '../../models';
import ReviewCard from '../review/ReviewCard';
import { useUser } from '../../hooks/useUser';
import { UPDATE_SHOPPING_CART, UPDATE_FAVORITES } from '../../graphql/mutations';
import useNotify from '../../hooks/useNotify';

interface ProductOverviewProps {
  product?: Product;
}

export default function ProductOverview({ product }: ProductOverviewProps) {
  // const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
  const [active, setActive] = React.useState(0);
  const router = useRouter();
  const [user] = useUser();
  const notify = useNotify();
  const [updateShoppingCart] = useMutation(UPDATE_SHOPPING_CART);
  const [updateFavorites] = useMutation(UPDATE_FAVORITES);

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
		notify(
		  'Ha ocurrido un error al anadir el producto al carrito',
		  'error'
		);
	  }
	} catch (err) {
	  notify(err.message, 'error', err);
	}
  };


  /** addToFavorites
   * @abstract Permite al usuario anadir productos a favoritos
   * @returns lista de productos en favoritos actualizada
   */
  const addToFavorites = async () => {
	try {
	  // Extrae la informacion de favoritos del usuario y agrega en un array los id de cada producto
	  const favoritesData = user?.favorites?.products.map((a) => a._id);
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
		notify(
		  'Ha ocurrido un error al anadir el producto a favoritos',
		  'error'
		);
	  }
	} catch (err) {
	  notify(err.message, 'error', err);
	}
  };

  

  return (
	<div className="w-full min-h-screen">
	  <div className="p-6">
		<div>
		  <h2 className="mb-1 font-semibold text-primary-100">
			USD{product.price}
		  </h2>
		  <h2 className="text-2xl font-bold">{product.name}</h2>
		</div>
		<div>
		  <div className="flex flex-row justify-around overflow-x-scroll scrollbar-hide space-x-5 my-4">
			<motion.button
			  whileHover={{
				scale: 1.005,
				boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
			  }}
			  value=""
			  type="button"
			  onClick={(e) => {
				e.preventDefault();
				setActive(0);
			  }}
			>
			  <span
				className={`${
				  active === 0 ? 'border-b-2 border-primary-100' : ''
				}`}
			  >
				Resumen
			  </span>
			</motion.button>
			<motion.button
			  whileHover={{
				scale: 1.005,
				boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
			  }}
			  value=""
			  type="button"
			  onClick={(e) => {
				e.preventDefault();
				setActive(1);
			  }}
			>
			  <span
				className={`${
				  active === 1 ? 'border-b-2 border-primary-100' : ''
				}`}
			  >
				Especificaciones
			  </span>
			</motion.button>
		  </div>
		</div>
		{active === 0 ? (
		  <div className="">
			<div className="w-full pb-12 flex flex-row overflow-scroll scrollbar-hide space-x-7">
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
		) : (
		  <div>
			<div className="py-2">
			  <h2 className="text-xl font-bold my-2">Vendedor</h2>
			  <button
				type="button"
				onClick={() =>
				  router.push(`/enterprise/${product.enterprise._id}`)
				}
			  >
				<h2 className="text-primary-100">{product.enterprise.name}</h2>
			  </button>
			</div>
			<div className="py-2">
			  <h2 className="text-xl font-bold my-2">Descripcion</h2>
			  <h2>{product.description}</h2>
			</div>
			<div className="py-2">
			  <h2 className="text-xl font-bold my-2">
				Presentacion del producto
			  </h2>
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
			  <h2 className="text-xl font-bold my-2">Serial</h2>
			  <h2>{product.serial}</h2>
			</div>
		  </div>
		)}
		<div>
		  {user?._id !== product?.enterprise.owner._id ? (
			<motion.button
			  whileHover={{
				scale: 1.005,
				boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
			  }}
			  value=""
			  type="button"
			  className="w-full h-11 bg-primary-100 text-white rounded-2xl px-4 py-2 my-12"
			  onClick={(e) => {
				e.persist();
				e.preventDefault();
				addToCart();
			  }}
			>
			  <span>Anadir al Carrito</span>
			</motion.button>
		  ) : (
			<motion.button
			  whileHover={{
				scale: 1.005,
				boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
			  }}
			  value=""
			  type="button"
			  className="w-full h-11 bg-primary-100 text-white rounded-2xl px-4 py-2 my-12"
			  onClick={(e) => {
				e.persist();
				e.preventDefault();
				router.push(`/product/update/${product._id}`);
			  }}
			>
			  <span>Editar Producto</span>
			</motion.button>
		  )}
		  <div>
			<h2 className="my-3">Review(#)</h2>
		  </div>
		  <div className="pt-4">
			<ReviewCard
			  name="Madelina"
			  rating={3}
			  comment="  
			  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, recusandae?
			  "
			/>
		  </div>
		  <div className="pt-4">
			<ReviewCard
			  name="Javier"
			  rating={4}
			  comment="  
			  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, recusandae?
			  "
			/>
		  </div>
		</div>
	  </div>
	</div>
  );
}
