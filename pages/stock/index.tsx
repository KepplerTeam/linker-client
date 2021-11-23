import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import TitleBar from '../../components/common/TitleBar';
import Footer from '../../components/common/Footer';
import { GET_PRODUCTS } from '../../graphql/queries';
import { Product } from '../../models';
import ProductCard from '../../components/product/ProductCard';
import CategorySelector from '../../components/common/CategorySelector';
import Nav from '../../components/Navbar/Nav';
import Loading from '../../components/common/Loading';

export default function StockPage() {
  const { data, loading } = useQuery<{
    products: Product[];
  }>(GET_PRODUCTS, {
    variables: { filter: { enterprise: '616f7e542f597f6abcaaa177' } },
    fetchPolicy: 'network-only',
  });

  const router = useRouter();

  const [category, setCategory] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {(loading && (
        <div className="w-screen h-full p-0 bg-gray-200">
          <Nav open={open} setOpen={setOpen} />
          <Loading />
          <Footer />
        </div>
      )) || (
        <div className="">
          <Nav open={open} setOpen={setOpen} />
          <TitleBar />
          <div className="px-5">
            <h2 className="font-bold text-2xl mt-6">Mis Productos</h2>
            <div className="">
              <motion.button
                className="bg-primary-100 px-3 h-auto py-1 text-white rounded-lg w-full mt-6 mb-2"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/create');
                }}
              >
                Nuevo Producto
              </motion.button>
            </div>
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
