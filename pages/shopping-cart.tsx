import React from 'react';
import { useQuery } from '@apollo/client';
import CartTitleBar from '../components/shoppingCart/CartTitleBar';
import CartProduct from '../components/shoppingCart/CartProduct';
import TitleBar from '../components/common/TitleBar';
import { GET_SHOPPING_CART } from '../graphql/queries';
import { ShoppingCart } from '../models';

export default function ShoppingCartPage() {
  const { data, loading } = useQuery<{ shoppingCart: ShoppingCart }>(
    GET_SHOPPING_CART,
    {
      variables: { filter: { _id: '6170ab2a74344308a8a7f57e' } },
      fetchPolicy: 'network-only',
    }
  );
  return (
    <>
      {(loading && (
        <div>
          <div className="h-screen w-full justify-center my-auto">
            <h2>Loading...</h2>
          </div>
        </div>
      )) || (
        <div>
          <TitleBar hasTrashIcon title="Carrito" />

          {data?.shoppingCart?.products.map((e) => (
            <CartProduct product={e} key={e._id} />
          ))}

          <div className="fixed bottom-0 w-full flex-col justify-center">
            <div className="flex flex-row px-8 items-center justify-between">
              <h6 className="text-gray-500 mr">Total items: 2</h6>
              <h4 className="text-lg font-bold">USD 295</h4>
            </div>
            <button className="flex checkout" type="button">
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
