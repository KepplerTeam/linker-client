import { useMutation } from '@apollo/client';
import { validateString } from 'avilatek-utils';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { CREATE_ENTERPRISE, UPDATE_ENTERPRISE } from '../../graphql/mutations';
import useNotify from '../../hooks/useNotify';
import { DocumentModel, Enterprise, User } from '../../models';
import CategorySelector from '../common/CategorySelector';
import DocumentForm from '../document/DocumentForm';

interface NewEnterpriseFormProps {
  user?: User;
  enterprise?: Enterprise;
  isUpdate?: boolean;
}

export default function NewEnterpriseForm({
  user,
  enterprise,
  isUpdate = false,
}: NewEnterpriseFormProps) {
  const notify = useNotify();
  const router = useRouter();

  const [createEnterprise] = useMutation(CREATE_ENTERPRISE);
  const [updateEnterprise] = useMutation(UPDATE_ENTERPRISE);
  const [name, setName] = React.useState(enterprise?.name || '');
  const [status, setStatus] = React.useState(enterprise?.status || 1);
  const [rating, setRating] = React.useState(0);
  const [banner, setBanner] = React.useState<DocumentModel[]>([]);
  const [currentBanner] = React.useState(enterprise?.banner);
  const [category, setCategory] = React.useState(0);
  const [rif, setRif] = React.useState(enterprise?.rif || '');

  /**
   * @abstract permite al usuario con role de empresario (vendedor) registrar nuevas empresas. Tambien puede actualizar empresas ya existentes con el prop 'isUpdate'
   * @param e
   */

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.persist();
      if (validateString(name)) {
        if (name !== '' && rif !== '') {
          if (user?.role === 2) {
            if (!isUpdate) {
              const { data } = await createEnterprise({
                variables: {
                  record: {
                    owner: user?._id,
                    name,
                    status: 1,
                    rating: 0,
                    // Settea un banner por defecto cuando se crea la empresa en caso de que el usuario no haya escogido un banner.
                    banner:
                      banner.length === 0
                        ? 'https://linker-files.sfo3.digitaloceanspaces.com/ent.jpg'
                        : banner[0].src,
                    category,
                    rif,
                  },
                },
              });
              if (data.createEnterprise) {
                notify('Empresa Creada con exito!', 'success');
                await router.push('/profile');
              } else {
                notify('Error la informacion.', 'warning');
              }
            } else {
              const { data } = await updateEnterprise({
                variables: {
                  filter: { _id: enterprise?._id },
                  record: {
                    name,
                    banner: banner.length === 0 ? currentBanner : banner[0].src,
                    status,
                  },
                },
              });
              if (data?.updateEnterprise) {
                notify('Empresa actualizada exitosamente!', 'success');
                await router.push(`/enterprise/${enterprise?._id}`);
              } else {
                notify('Error al actualizar', 'error');
              }
            }
          } else {
            notify('No tiene permiso para registrar una empresa.', 'warning');
            router.push('/feed');
          }
        } else {
          notify('Verifique la informacion', 'warning');
        }
      } else {
        notify('Datos invalidos', 'warning');
      }
    } catch (err) {
      notify(err.message, 'error', err);
    } finally {
      setName('');
      setBanner([]);
      setCategory(0);
      setRif('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="bg-white min-h-screen w-full bg-opacity-60 px-6 py-12">
        <div className="">
          <div className="bg-gray-100 rounded-lg w-4/5 mx-auto">
            <div className="px-5 py-3">
              {isUpdate ? (
                <h2 className="text-xl font-bold">Actualizar Empresa</h2>
              ) : (
                <h2 className="text-xl font-bold">Registrar Empresa</h2>
              )}
              <div className="mt-5 pb-3">
                <h2 className="py-2 mt-5 ml-1">Nombre de la empresa</h2>
                <input
                  type="text"
                  name="enterpriseName"
                  placeholder="Coca-Cola"
                  value={name}
                  className="w-full rounded-2xl"
                  onChange={(e) => setName(e.target.value)}
                />
                <h2 className="py-2 mt-5 ml-1">Rif de la Empresa</h2>
                <input
                  type="text"
                  name="rif"
                  value={rif}
                  placeholder="18842899F"
                  className="w-full rounded-2xl"
                  onChange={(e) => setRif(e.target.value)}
                />
                <h2 className="py-2 mt-5 ml-1">Categoria de la empresa</h2>
                <CategorySelector
                  category={category}
                  setCategory={setCategory}
                />
                <h2 className="py-2 mt-5 ml-1">Banner de la empresa</h2>
                <DocumentForm
                  updateURLs={setBanner}
                  documents={banner}
                  fileType="img"
                />
                {isUpdate && enterprise?.status === 1 ? (
                  <div>
                    <motion.button
                      className="bg-primary-100 rounded-full px-3 py-2 w-full mt-6 text-white font-bold"
                      onClick={() => setStatus(2)}
                    >
                      Desactivar
                    </motion.button>
                  </div>
                ) : (
                  ''
                )}
                {isUpdate && enterprise?.status === 2 ? (
                  <div>
                    <motion.button
                      className="bg-primary-100 rounded-full px-3 py-2 w-full mt-6 text-white font-bold"
                      onClick={() => setStatus(1)}
                    >
                      Activar
                    </motion.button>
                  </div>
                ) : (
                  ''
                )}
                <div>
                  <motion.button
                    className="bg-primary-100 rounded-full px-3 py-2 w-full mt-6 text-white font-bold"
                    type="submit"
                    value="Send"
                  >
                    Registrar Empresa
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
