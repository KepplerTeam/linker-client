import React from 'react';
import { useQuery } from '@apollo/client';
import Nav from '../components/Navbar/Nav';
import Search from '../components/home/Search';
import CardHome from '../components/home/CardHome';
import Footer from '../components/common/Footer';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from '../models';
import Loading from '../components/common/Loading';

export default function Home() {
  const [category, setCategory] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);

  const { data, loading } = useQuery<{
    products: Product[];
  }>(GET_PRODUCTS, {
    variables: { filter: { category } },
    fetchPolicy: 'network-only',
  });

  // Aca hay que decidir cuales seran los featured, creo que deberian ser los que tengan mejor rating
  const { data: featuredProducts, loading: loadingFeaturedProducts } =
    useQuery<{
      products: Product[];
    }>(GET_PRODUCTS, {
      variables: { filter: {} },
      fetchPolicy: 'network-only',
    });

  return (
    <>
      {loading ||
        (loadingFeaturedProducts && (
          <div className="w-screen h-full p-0 bg-gray-200">
            <Nav open={open} setOpen={setOpen} />
            <Loading />
            <Footer />
          </div>
        )) || (
          <div className="w-screen h-full p-0 bg-gray-200">
            <div>
              <Nav open={open} setOpen={setOpen} />
              <Search data={featuredProducts?.products} />
              <CardHome
                allProducts={data?.products}
                featuredProducts={featuredProducts?.products}
                category={category}
                setCategory={setCategory}
              />
              <Footer />
            </div>
          </div>
        )}
    </>
  );
}
