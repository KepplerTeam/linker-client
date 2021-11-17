import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Product } from '../../models/index';

interface SearchProps {
  data?: Product[];
}

export default function Search({ data }: SearchProps) {
  const [searchTerm, setSearchTerm] = React.useState([]);
  const [user] = useUser();

  /** handleFilter
   * @abstract permite al usuario hacer busquedas utilizando un searchbar. Se busca por nombre del producto.
   * @param event recibe el evento generado al escribir en el input
   * @returns lista de productos que coincidan con el filtro de busqueda.
   */
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    // eslint-disable-next-line arrow-body-style
    const newFilter = data.filter((value) => {
      if (searchWord === '') return null;
      return value.name.toLowerCase().includes(searchWord);
    });
    setSearchTerm(newFilter);
  };
  return (
    <div className="w-full mt-3 p-6">
      <h4 className="text-lg font-light pb-2">Bienvenido, {user?.firstName}</h4>
      <h1 className="text-3xl font-bold">¿Qué desea comprar hoy?</h1>
      <input
        className="input-text"
        type="text"
        name="search"
        id="search"
        onChange={handleFilter}
        placeholder="Buscar Productos"
      />
      {searchTerm?.length !== 0 && (
        <div className=" w-full h-32 bg-gray-50 overflow-hidden overflow-y-auto text-sm p-2 mt-1 shadow-lg scrollbar-hide">
          {searchTerm?.map((value) => (
            <a
              href={`/product/${value._id}`}
              className="w-full flex items-center border-b-2 border-primary-blue-400 hover:bg-gray-100 hover:text-black text-gray-500"
            >
              <a>{value.name}</a>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
