import React from 'react';
import { useQuery } from '@apollo/client';
import ProductFeed from './ProductFeed';
import FeaturedProductFeed from './FeaturedProductFeed';
import { Product } from '../../models';
import CategorySelector from '../common/CategorySelector';
import { GET_PRODUCTS } from '../../graphql/queries';

export default function CardHome() {
  const { data, loading } = useQuery<{
    products: Product[];
  }>(GET_PRODUCTS, {
    variables: {},
    fetchPolicy: 'network-only',
  });

  const [category, setCategory] = React.useState<number>();

  const { data: specificData, loading: loadingSpecificData } = useQuery<{
    products: Product[];
  }>(GET_PRODUCTS, {
    variables: { filter: { category } },
    fetchPolicy: 'network-only',
  });

  // React.useEffect(() => {

  // })

  return (
    <div className="card-home">
      {(loading && (
        <div className="h-screen w-full justify-center my-auto">
          <h2>Loading...</h2>
        </div>
      )) || (
        <div>
          <CategorySelector category={category} setCategory={setCategory} />
          <ProductFeed products={data.products} />
          <div className="flex justify-between mt-8 mb-2 pr-4">
            <h3 className="text-lg font-normal pb-2">Productos Destacados</h3>
            <a className="font-light text-gray-600 pb-2" href="#">
              Ver Todos
            </a>
          </div>
          <FeaturedProductFeed products={data.products} />
        </div>
      )}
    </div>
  );
}
