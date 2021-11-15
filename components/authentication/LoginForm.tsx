import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../../graphql/mutations';
import { User } from '../../models';
import { useUser } from '../../hooks/useUser';
import useNotify from '../../hooks/useNotify';

export default function LoginForm() {
  const router = useRouter();
  const [user, setUser] = useUser();
  const notify = useNotify();

  const [signIn] = useMutation<{ signIn: User }>(SIGN_IN);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await signIn({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      if (data.signIn) {
        setUser(data?.signIn);
        notify('Inicio de sesion correcto', 'success');
        await router.push('/feed');
      }
    } catch (err) {
      notify('Ha ocurrido un error', 'warning');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-white min-h-screen w-full bg-opacity-60 px-6 py-32">
        <div className="">
          <div className="bg-gray-100 rounded-lg w-4/5 mx-auto">
            <div className="px-5 py-3">
              <h2 className="text-xl font-bold">Inicia Sesion</h2>
              <div className="mt-5 pb-3">
                <h2 className="pb-2 ml-1">Correo Electronico</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full rounded-2xl"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h2 className="py-2 mt-5 ml-1">Contrasena</h2>
                <input
                  type="password"
                  name="password"
                  placeholder="*************"
                  className="w-full rounded-2xl"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="text-primary-100 font-bold text-sm mb-6 mt-2 ml-1"
                >
                  Olvide mi contrasena
                </button>
                <div className="text-sm">
                  <h2 className="text-black">No tienes una cuenta? </h2>
                  <button
                    type="button"
                    className="mb-6 mt-2 ml-1 text-primary-100 font-bold"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/signup');
                    }}
                  >
                    Registrate!
                  </button>
                </div>
                <motion.button
                  className="bg-primary-100 rounded-full px-3 py-2 w-full text-white font-bold"
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
    </form>
  );
}
