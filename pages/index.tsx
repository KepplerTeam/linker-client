import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Footer from '../components/common/Footer';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from '../models';
import { useUser } from '../hooks/useUser';
import SidebarMenu from '../components/common/SidebarMenu';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="w-screen h-full p-0 bg-gray-500">
        <div className="w-full flex flex-row px-3 pt-3 pb-4 rounded-br-xl rounded-bl-xl bg-gray-200 shadow-2xl sticky">
          <button
            type="button"
            className="flex items-center"
            // onClick={() => handleOpen()}
          >
            <img className="h-7" src="./icons/menu-variant.svg" alt="Menu" />
          </button>
          <a className="mx-auto" href="/">
            <img className="h-8" src="./logo.svg" alt="Linker" />
          </a>
          <button
            type="button"
            className="signup flex items-center uppercase"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </div>
        <div className="w-full p-6 py-32 justify-center bg-landing-background bg-cover shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white mx-10">
            Lleva tu negocio al siguiente nivel
          </h2>
          <div className="flex justify-center">
            <button
              type="button"
              className="flex items-center bg-primary-100 text-white font-bold text-xl rounded-xl border-0 px-5 p-3 mt-12 mb-6 animate-pulse shadow-xl hover:bg-primary-600"
              onClick={() => router.push('/login')}
            >
              Empezar Linker
            </button>
          </div>
        </div>
        <div className="bg-gray-700 border-0">
          <div className="w-full px-6 py-10 rounded-b-2xl bg-white">
            <h2 className="flex justify-center font-bold text-2xl mb-8">
              ¿Quienes somos?
            </h2>
            <p className="flex justify-center my-2 mx-6 text-justify text-lg font-light pb-4">
              Permitimos que las empresas transformen la forma en que venden y
              operan, para así mejorar su eficiencia. Brindamos la
              infraestructura tecnológica y el alcance de marketing para ayudar
              a los comerciantes, marcas, minoristas y otras empresas a
              aprovechar el poder de la nueva tecnología e interactuar con sus
              usuarios y clientes.
            </p>
          </div>
        </div>

        <div className="w-full p-6 bg-gray-700 text-white">
          <h2 className="flex justify-center font-bold text-2xl my-8">
            Conoce al equipo
          </h2>
          <p className="flex justify-center my-2 mx-6 text-justify text-lg font-light pb-4">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </p>
          <div className="w-full my-12 px-4">
            <div className="px-6">
              <img
                alt="Sebastián Vivas"
                src="/sebas.jpeg"
                className="shadow-lg rounded-full max-w-full mx-auto"
                style={{ maxWidth: '120px' }}
              />
              <div className="pt-6 text-center">
                <h5 className="text-xl font-bold">Sebastián Vivas</h5>
                <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                  Ingeniero de Sistemas
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mb-12 px-4">
            <div className="px-6">
              <img
                alt="Carlos Graterol"
                src="/carlos.jpeg"
                className="shadow-lg rounded-full max-w-full mx-auto"
                style={{ maxWidth: '120px' }}
              />
              <div className="pt-6 text-center">
                <h5 className="text-xl font-bold">Carlos Graterol</h5>
                <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                  Ingeniero de Sistemas
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mb-12 px-4">
            <div className="px-6">
              <img
                alt="Edward Vergel"
                src="/edward.jpeg"
                className="shadow-lg rounded-full max-w-full mx-auto"
                style={{ maxWidth: '120px' }}
              />
              <div className="pt-6 text-center">
                <h5 className="text-xl font-bold">Edward Vergel</h5>
                <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                  Ingeniero de Sistemas
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-6 bg-primary-100 justify-center">
          <h2 className="flex justify-center text-center font-bold text-2xl text-white my-8">
            ¿Empezando un nuevo negocio?
          </h2>
          <p className="flex justify-center my-2 mx-6 text-justify text-lg text-white font-light pb-4">
            Encuentra tus productos en un solo lugar! Regístrate ahora.
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              className="flex items-center py-2 px-4 rounded-2xl bg-gray-200 hover:bg-gray-300 text-black text-md font-bold"
              onClick={() => router.push('/signup')}
            >
              Quiero ser empresario
            </button>
          </div>
          <h2 className="flex justify-center text-center font-bold text-2xl text-white mt-12 mb-8">
            ¿Tienes tiempo en el mercado?
          </h2>
          <p className="flex justify-center my-2 mx-6 text-justify text-lg text-white font-light pb-4">
            Es momento de aumentar tus ventas! Regístrate ahora.
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              className="flex items-center py-2 px-4 rounded-2xl bg-gray-200 hover:bg-gray-300 text-black text-md font-bold"
              onClick={() => router.push('/signup')}
            >
              Quiero ser proveedor
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
