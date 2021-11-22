import { useMutation } from '@apollo/client';
import { validateEmail, validateString } from 'avilatek-utils';
import { motion } from 'framer-motion';
import { imageConfigDefault } from 'next/dist/server/image-config';
import router from 'next/router';
import React from 'react';
import { UPDATE_USER } from '../../graphql/mutations';
import useNotify from '../../hooks/useNotify';
import { useUser } from '../../hooks/useUser';
import { DocumentModel } from '../../models';
import TitleBar from '../common/TitleBar';
import DocumentForm from '../document/DocumentForm';
import { Input } from '../inputs';

export default function ProfileEditForm() {
  const [user] = useUser();
  const notify = useNotify();
  const [email, setEmail] = React.useState(user?.email);
  const [name, setName] = React.useState(user?.firstName);
  const [lastname, setLastname] = React.useState(user?.lastName);
  const [currentImage] = React.useState(user?.image);
  const [image, setImage] = React.useState<DocumentModel[]>([]);
  const [updateUser] = useMutation(UPDATE_USER);

  React.useEffect(() => {
    if (user) {
      setName(user?.firstName);
      setLastname(user?.lastName);
      setEmail(user?.email);
    }
  }, [user]);

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      // e.preventDefault();

      if (
        !validateString(name) ||
        !validateString(lastname) ||
        !validateEmail(email)
      ) {
        return notify('Por favor verifique sus datos', 'warning');
      }
      const { data: dataUpdate } = await updateUser({
        variables: {
          filter: { _id: user?._id },
          record: {
            firstName: name.charAt(0).toUpperCase() + name.substring(1),
            lastName: lastname.charAt(0).toUpperCase() + lastname.substring(1),
            email,
            image: image.length === 0 ? currentImage : image[0].src,
          },
        },
      });
      if (dataUpdate) {
        notify('Perfil actualizado con exito', 'success');
        await router.push('/profile');
      } else {
        notify('No se ha podido actualizar el perfil', 'warning');
      }
    } catch (err) {
      notify(err.message, 'danger', err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="py-4">
        <div className="px-3">
          <div>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder={user?.firstName}
              className="w-full h-8 my-1 text-sm "
              value={name}
              setValue={setName}
              label="Nombre"
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              id="title"
              name="title"
              placeholder={user?.lastName}
              className="w-full h-8 my-1 text-sm "
              value={lastname}
              setValue={setLastname}
              label="Apellido"
            />
          </div>
          <div className="mt-4">
            <Input
              type="text"
              id="title"
              name="title"
              placeholder={user?.email}
              className="w-full h-8 my-1 text-sm "
              value={email}
              setValue={setEmail}
              label="Correo Electronico"
            />
          </div>
          <h2 className="font-bold mt-4">Foto de Perfil</h2>
          <DocumentForm
            updateURLs={setImage}
            documents={image}
            fileType="img"
          />
        </div>
      </div>
      <div className="mt-6 px-6">
        <motion.button
          whileHover={{
            scale: 1.005,
            boxShadow: '0px 0px 4px rgb(51,51,51, 0.5)',
          }}
          className="bg-primary-100 text-white px-7 w-full h-8 rounded-full"
          value=""
          type="button"
          onClick={(e) => handleUpdate(e)}
        >
          Confirmar
        </motion.button>
      </div>
    </div>
  );
}
