import React from 'react';
import { useQuery } from '@apollo/client';
import TitleBar from '../../components/common/TitleBar';
import Footer from '../../components/common/Footer';
import { GET_PRODUCTS } from '../../graphql/queries';
import { Product } from '../../models';
import ProductCard from '../../components/product/ProductCard';
import CategorySelector from '../../components/common/CategorySelector';

export default function StockPage() {
  const { data, loading } = useQuery<{
    products: Product[];
  }>(GET_PRODUCTS, {
    variables: { filter: { enterprise: '616f7e542f597f6abcaaa177' } },
    fetchPolicy: 'network-only',
  });

  const [category, setCategory] = React.useState<number>(0);

  return (
    <>
      {(loading && (
        <div className="h-screen w-full justify-center my-auto">
          <h2>Loading...</h2>
        </div>
      )) || (
        <div className="">
          <TitleBar />
          <div className="px-5">
            <h2 className="font-bold text-2xl mt-6">Mis Productos</h2>
            <CategorySelector category={category} setCategory={setCategory} />
          </div>
          <div className="">
            <ProductCard products={data.products} />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
