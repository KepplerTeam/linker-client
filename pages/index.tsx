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

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
    <div className="w-screen h-full p-0">
        <div className="w-full flex flex-row px-3 pt-3 pb-4 rounded-br-xl rounded-bl-xl bg-gray-200 shadow-2xl sticky">
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
            Log In
          </button>
        </div>

        <div className="w-full mb-8 p-6 py-32 justify-center bg-landing-background bg-cover bg-white shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white opacity-100 mx-10">
            La manera más sencilla de emprender
          </h2>
          <div className="flex justify-center">
            <button
              type="button"
              className="flex items-center bg-primary-100 text-white font-bold text-xl rounded-xl border-0 px-5 py-3 my-8 opacity-100 shadow-xl hover:bg-primary-600"
              onClick={() => router.push('/login')}
            >
              Launch Linker
            </button>
          </div>
        </div>

        <div className="w-full p-6 rounded-2xl">
          <h2 className="flex justify-center font-bold text-2xl mb-8">
            ¿Quienes somos?
          </h2>
          <p className="flex justify-center my-2 mx-6 text-justify text-lg font-medium pb-4">
            Permitimos que las empresas transformen la forma en que venden
            y operan, para así mejorar su eficiencia. Brindamos la infraestructura
            tecnológica y el alcance de marketing para ayudar a los comerciantes, marcas, 
            minoristas y otras empresas a aprovechar el poder de la nueva tecnología para 
            interactuar con sus usuarios y clientes y operar de una manera más eficiente.
          </p>
        </div>
        <div className="w-full p-6 bg-gray-700 text-white">
          <h2 className="flex justify-center font-bold text-2xl my-8">
            Main Features
          </h2>
          <p className="flex justify-center my-2 mx-6 text-justify text-lg font-medium pb-4">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Donec quam felis,
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}
