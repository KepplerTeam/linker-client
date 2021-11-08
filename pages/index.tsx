import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Footer from '../components/common/Footer';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from '../models';
import { useUser } from '../hooks/useUser';
import SidebarMenu from '../components/common/SidebarMenu';

export default function Home() {
  const [category, setCategory] = React.useState<number>(0);
  const [user] = useUser();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

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

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {loading ||
        (loadingFeaturedProducts && (
          <div className="h-screen w-full justify-center my-auto">
            <h2>Loading...</h2>
          </div>
        )) || (
          <div className="w-screen h-full p-0">
            <div>
              {/* <Nav open={open} setOpen={setOpen} />
              <Search data={featuredProducts?.products} />
              <CardHome
                allProducts={data?.products}
                featuredProducts={featuredProducts?.products}
                category={category}
                setCategory={setCategory}
              /> */}
              <div className="w-full flex flex-row px-3 pt-3 pb-4 rounded-br-xl rounded-bl-xl bg-gray-200 shadow-2xl">
                <button
                  type="button"
                  className="flex items-center"
                  // onClick={() => handleOpen()}
                >
                  <img
                    className="h-7"
                    src="./icons/menu-variant.svg"
                    alt="Menu"
                  />
                </button>
                <a className="mx-auto" href="/">
                  <img className="h-8" src="./logo.svg" alt="Linker" />
                </a>
                <button
                  type="button"
                  className="signup flex items-center"
                  onClick={() => router.push('/login')}
                >
                  LOGIN
                </button>
              </div>

              <div className="w-full mb-10 p-6 py-32 justify-center bg-landing-background bg-cover bg-white shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-white opacity-100 mx-10">
                  Lleva tu negocio al siguiente nivel 
                </h2>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="animate-bounce flex items-center bg-primary-100 text-white font-bold text-xl rounded-xl border-0 px-5 py-3 my-8 opacity-100 shadow-xl hover:bg-primary-600"
                    onClick={() => router.push('/login')}
                  >
                    Empezar Linker
                  </button>
                </div>
              </div>

              <div className="w-full p-6 bg-white rounded-2xl">
                <h2 className="flex justify-center font-bold text-3xl my-7 text-primary-100">
                  ¿Tienes tiempo en el mercado?
                </h2>
                <p className="flex justify-center my-2 mx-6 text-justify text-lg font-medium">
                  <div className="flex flex-col">
                    <div>
                      Es momento de aumentar tus ventas! Registrate
                      Ahora.
                    </div>
                    <div className="text-left font-extrabold text-2xl text-primary-100 mt-4">
                      <a href="/signup"> Quiero ser Proveedor</a>

                    </div>
                  </div>
                </p>
              </div>

              <div className="w-full p-6 bg-primary-100 ">
                <h2 className="flex justify-center font-bold text-3xl my-7 text-white">
                  ¿Empezando un nuevo negocio?
                </h2>
                <p className="flex justify-center my-2 mx-6 text-justify text-lg font-medium">
                  <div className="flex flex-col">
                    <div>
                      Encuentra tus productos en un solo
                      lugar! Registrate ahora
                    </div>
                    <div className="w-full text-left font-extrabold text-2xl mt-4 text-white">
                      <a href="/signup">
                        Quiero ser Empresario
                        </a>
                    </div>
                  </div>
                </p>
              </div>

              <Footer />
            </div>
          </div>
        )}
    </>
  );
}
