import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import SSNDropdown from '../common/SSNDropdown';
import useNotify from '../../hooks/useNotify';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [ssn, setSsn] = React.useState('');
  const [ssnUnit, setSsnUnit] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [dob, setDob] = React.useState('');
  //   const [] = React.useState('');
  const notify = useNotify();

  function formatInput(data: string) {
    return data.charAt(0).toUpperCase() + data.substring(1);
  }

  function handleContinue() {
    try {
      if (
        email !== '' &&
        password !== '' &&
        confirmPassword !== '' &&
        ssn !== '' &&
        name !== '' &&
        lastname !== '' &&
        dob !== ''
      ) {
        if (password === confirmPassword) {
          console.log('las passwords coinciden');
          //   hacer el mutation, funcion asincrona
          router.push('/');
        } else {
          //   notify('Contrasena invalida', 'error');
          console.log('Las passwords no coinciden');
        }
      } else {
        console.log('Datos incompletos');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-white min-h-screen w-full bg-opacity-60 px-6 py-12">
      <div className="">
        <div className="bg-gray-100 rounded-lg w-4/5 mx-auto">
          <div className="px-5 py-3">
            <h2 className="text-xl font-bold">Crear Cuenta</h2>
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
              <h2 className="py-2 mt-5 ml-1">Confirmar Contrasena</h2>
              <input
                type="password"
                name="password"
                placeholder="*************"
                className="w-full rounded-2xl"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <h2 className="py-2 mt-5 ml-1">Nombre</h2>
              <input
                type="text"
                name="name"
                placeholder="John"
                className="w-full rounded-2xl"
                onChange={(e) => setName(e.target.value)}
              />
              <h2 className="py-2 mt-5 ml-1">Apellido</h2>
              <input
                type="text"
                name="lastname"
                placeholder="Doe"
                className="w-full rounded-2xl"
                onChange={(e) => setLastname(e.target.value)}
              />
              <h2 className="py-2 mt-5 ml-1">Cedula o Rif</h2>
              <div className="flex flex-row w-full space-x-1">
                <div className="w-1/2 h-full">
                  <SSNDropdown unit={ssnUnit} setUnit={setSsnUnit} />
                </div>
                <input
                  type="text"
                  name="ssn"
                  placeholder="1234567"
                  className="w-full rounded-2xl h-full"
                  onChange={(e) => setSsn(e.target.value)}
                />
              </div>
              <h2 className="py-2 mt-5 ml-1">Fecha de Nacimiento</h2>
              <input
                type="date"
                name="dob"
                placeholder="*************"
                className="w-full rounded-2xl"
                onChange={(e) => setDob(e.target.value)}
              />
              <motion.button
                className="bg-primary-100 rounded-full px-3 py-2 w-full mt-6 text-white font-bold"
                onClick={handleContinue}
              >
                Continuar
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
