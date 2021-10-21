import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_PRODUCT } from '../../graphql/queries';
import { Product } from '../../models';
import { TrashIcon } from '../icons';

interface CartProductProps {
  product: Product;
}

export default function CartProduct({ product }: CartProductProps) {
  const { data, loading } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { filter: { _id: product._id } },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      {(loading && (
        <div className="h-screen w-full justify-center my-auto">
          <h2>Loading...</h2>
        </div>
      )) || (
        <div
          className="card flex flex-row px-8 items-center justify-center w-full"
          key={data.product._id}
        >
          <img
            className="h-32 w-auto p-4 bg-gray-100 rounded-3xl"
            src={data.product.images[0]}
            alt={data.product.name}
          />
          <div className="py-5 pl-5 flex flex-col items-start h-full w-full">
            <h4 className="text-l font-light mb-auto">{data.product.name}</h4>
            <h5 className="text-sm font-bold mb-3">USD{data.product.price}</h5>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex mr-auto">
                <button className="cart w-7 mr-2" type="button">
                  {' '}
                  -{' '}
                </button>
                <p>1</p>
                <button className="cart w-7 ml-2" type="button">
                  {' '}
                  +{' '}
                </button>
              </div>
              <a className="">
                <TrashIcon className="w-5 h-5 opacity-50" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
