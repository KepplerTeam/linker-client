import React from 'react';
import { useQuery } from '@apollo/client';
import CartTitleBar from '../components/shoppingCart/CartTitleBar';
import CartProduct from '../components/shoppingCart/CartProduct';
import TitleBar from '../components/common/TitleBar';
import { GET_SHOPPING_CART } from '../graphql/queries';
import { Product, ShoppingCart } from '../models';

export default function ShoppingCartPage() {
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    const cartFromLocalStorage = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
    setCart(cartFromLocalStorage);
  }, []);

  const addToCart = (producto: Product) => {
    console.log('llamando el set');
    setCart([...cart, producto]);
    console.log('tamano del carro: ', cart.length);
  };

  const totalPrice = cart.reduce((sum, { price }) => sum + price, 0);

  // const totalPrice =
  return (
    <>
      <div>
        <TitleBar hasTrashIcon title="Carrito" />

        {cart.map((e, idx) => (
          <CartProduct
            product={e}
            key={idx}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
          />
        ))}

        <div className="fixed bottom-0 w-full flex-col justify-center">
          <div className="flex flex-row px-8 items-center justify-between">
            <h6 className="text-gray-500 mr">Productos: {cart.length}</h6>
            <h4 className="text-lg font-bold">Precio: $ {totalPrice} </h4>
          </div>
          <button className="flex checkout" type="button">
            Proceed to checkout
          </button>
        </div>
      </div>
    </>
  );
}
