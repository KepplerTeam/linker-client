import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { SIGN_IN_MOBILE } from '../../graphql/mutations';
import { User } from '../../models';
import { useUser } from '../../hooks/useUser';
import useNotify from '../../hooks/useNotify';

export default function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useUser();
  const notify = useNotify();

  const [signInMobile] =
    useMutation<{ signInMobile: { User; token } }>(SIGN_IN_MOBILE);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  /**
   * @abstract Se encarga de manejar el inicio de sesion. Envia el email y la contrasena y el controlador se encarga de hacer la verificacion de que el usuario exista y la contrasena sea correcta
   * @param e: Evento de tipo FormEvent<HTMLFormElement>
   * @returns: settea al context el usuario en caso de que el login sea valido.
   *
   */

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await signInMobile({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      if (data.signInMobile) {
        setUser(data?.signInMobile.User);
        localStorage.setItem('token', data?.signInMobile.token);
        notify('Inicio de sesion correcto', 'success');
        await router.push('/feed');
      }
    } catch (err) {
      notify('Ha ocurrido un error', 'warning');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-login-background bg-cover min-h-screen w-full bg-opacity-60 px-6 pt-12 pb-32">
        <div className="">
          <div className="flex flex-col items-center mb-12">
            <img className="h-16 mr-5" src="/logo.svg" alt="Linker" />
          </div>
          <div className="bg-gray-50 shadow-2xl rounded-lg w-4/5 mx-auto">
            <div className="px-5 py-3">
              <h2 className="text-xl mt-2 font-bold">Inicia Sesión</h2>
              <div className="mt-5 pb-3">
                <h2 className="pb-2 ml-1">Correo Electrónico</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full rounded-2xl focus:ring-1 focus:border-primary-100 focus:ring-primary-100"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h2 className="py-2 mt-5 ml-1">Contraseña</h2>
                <input
                  type="password"
                  name="password"
                  placeholder="*************"
                  className="w-full rounded-2xl focus:ring-1 focus:border-primary-100 focus:ring-primary-100"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="text-primary-100 hover:underline font-bold text-sm mb-6 mt-2 ml-1"
                >
                  Olvidé mi contrasena
                </button>
                <div className="text-sm">
                  <h2 className="text-base ml-1">¿No tienes una cuenta? </h2>
                  <button
                    type="button"
                    className="mb-6 mt-1 ml-1 text-primary-100 hover:underline font-bold"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/signup');
                    }}
                  >
                    Registrate!
                  </button>
                </div>
                <div className="flex justify-center">
                  <motion.button
                    className="bg-primary-100 hover:bg-primary-600 shadow-md hover:shadow-2xl rounded-3xl px-6 py-2 text-white font-bold"
                    type="submit"
                    value="Send"
                  >
                    Continuar
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
