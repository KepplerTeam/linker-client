import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { validateString } from 'avilatek-utils';
import SSNDropdown from '../common/SSNDropdown';
import useNotify from '../../hooks/useNotify';
import { CREATE_USER } from '../../graphql/mutations';
import RoleDropdown from '../common/RoleDropdown';
import CategorySelector from '../common/CategorySelector';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [ssn, setSsn] = React.useState('');
  const [ssnUnit, setSsnUnit] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [role, setRole] = React.useState();
  const [enterpriseName, setEnterpriseName] = React.useState('');
  const [rif, setRif] = React.useState('');
  const [category, setCategory] = React.useState();
  const [createUser] = useMutation(CREATE_USER);
  const notify = useNotify();
  const [firstForm, setFirstForm] = React.useState(true);
  const [secondForm, setSeconddForm] = React.useState(false);

  /**
   * onSubmit
   * @abstract Este metodo se encarga de realizar la creacion de una cuenta de un usuario nuevo dependiendo del rol que escoja en el formulario
   * @param e: Evento de tipo React.FormEvent<HTMLFormElement>
   * @returns: retorna el usuario creado y se inicia la sesion.
   */

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.persist();
      // Verifica que los datos no esten vacios
      if (
        email !== '' &&
        password !== '' &&
        confirmPassword !== '' &&
        ssn !== '' &&
        name !== '' &&
        lastname !== '' &&
        dob !== '' &&
        role !== ''
      ) {
        // Verifica que las contrasenas sean iguales y que tengan un tamano mayor a 6 caracteres por seguridad.
        if (password === confirmPassword && password.length > 6) {
          if (!validateString(name) || !validateString(lastname)) {
            return notify('Por favor, verifique sus datos', 'warning');
          }
          // Role 1 es emprendedor (comprador)
          if (role === '1') {
            const { data } = await createUser({
              variables: {
                data: {
                  createUserInfo: {
                    username,
                    firstName: name.charAt(0).toUpperCase() + name.substring(1),
                    lastName:
                      lastname.charAt(0).toUpperCase() + lastname.substring(1),
                    dni: ssnUnit.concat('-', ssn),
                    password,
                    email: email.toLowerCase(),
                    role: Number(role),
                    image:
                      'https://linker-files.sfo3.digitaloceanspaces.com/User-Profile-PNG-Clipart.png',
                  },
                },
              },
            });
            if (data?.signUp) {
              notify('Usuario creado exitosamente', 'success');
              await router.push('/feed');
            }
            return notify('No se ha podido crear el usuario', 'warning');
          }
          // Role 2 es empresario (vendedor)
          if (role === '2') {
            if (enterpriseName !== '' && category !== '' && rif !== '') {
              const { data: dataCreateUser } = await createUser({
                variables: {
                  data: {
                    createUserInfo: {
                      username,
                      firstName:
                        name.charAt(0).toUpperCase() + name.substring(1),
                      lastName:
                        lastname.charAt(0).toUpperCase() +
                        lastname.substring(1),
                      dni: ssnUnit.concat('-', ssn),
                      password,
                      email: email.toLowerCase(),
                      role: Number(role),
                      image:
                        'https://linker-files.sfo3.digitaloceanspaces.com/User-Profile-PNG-Clipart.png',
                    },
                    createEnterprise: {
                      name: enterpriseName,
                      rif,
                      category: Number(category),
                    },
                  },
                },
              });
              if (dataCreateUser?.signUp) {
                notify('Cuenta creada con exito!', 'success');
                await router.push('/feed');
              }
              return notify('No se ha podido crear el usuario', 'warning');
            }
            return notify('Informacion de la empresa incompleta', 'warning');
          }
          return notify('Rol invalido', 'error');
        }
        return notify(
          'Contrasena invalida, verifique que coinciden y que tengan al menos 6 caracteres',
          'warning'
        );
      }
      return notify('Informacion incompleta', 'warning');
    } catch (error) {
      return notify('Ha ocurrido un error', 'warning');
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="bg-white min-h-screen w-full bg-opacity-60 px-6 py-12">
        <div className="">
          <div className="bg-gray-100 rounded-lg w-4/5 mx-auto">
            <div className="px-5 py-3">
              <h2 className="text-xl font-bold">Crear Cuenta</h2>
              <div className="mt-5 pb-3">
                {firstForm ? (
                  <div>
                    <h2 className="pb-2 ml-1">Nombre de usuario</h2>
                    <input
                      type="text"
                      name="username"
                      placeholder="johndoe1"
                      className="w-full rounded-2xl"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                ) : null}
                <h2 className="pb-2 ml-1 mt-5">Correo Electronico</h2>
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
                <h2 className="py-2 mt-5 ml-1">Cedula o Rif del usuario</h2>
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
                <h2 className="py-2 mt-5 ml-1">Seleccione su rol</h2>
                <RoleDropdown role={role} setRole={setRole} />
                {role === '2' ? (
                  <>
                    <h2 className="py-2 mt-5 ml-1">Nombre de la empresa</h2>
                    <input
                      type="text"
                      name="enterpriseName"
                      placeholder="Coca-Cola"
                      className="w-full rounded-2xl"
                      onChange={(e) => setEnterpriseName(e.target.value)}
                    />
                    <h2 className="py-2 mt-5 ml-1">Rif de la Empresa</h2>
                    <input
                      type="text"
                      name="rif"
                      placeholder="18842899F"
                      className="w-full rounded-2xl"
                      onChange={(e) => setRif(e.target.value)}
                    />
                    <h2 className="py-2 mt-5 ml-1">Categoria de la empresa</h2>
                    <CategorySelector
                      category={category}
                      setCategory={setCategory}
                    />
                  </>
                ) : null}

                <motion.button
                  className="bg-primary-100 rounded-full px-3 py-2 w-full mt-6 text-white font-bold"
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
