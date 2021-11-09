import React from 'react';
import { DocumentModel } from '../../models';
import CategorySelector from '../common/CategorySelector';
import UnitsDropdown from '../common/UnitsDropdown';
import DocumentForm from '../document/DocumentForm';
import { Input } from '../inputs';

interface CreateProductFormProps {
  name?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  category?: number;
  setCategory?: React.Dispatch<React.SetStateAction<number>>;
  description?: string;
  setDescription?: React.Dispatch<React.SetStateAction<string>>;
  stock?: number;
  setStock: React.Dispatch<React.SetStateAction<number>>;
  price?: number;
  setPrice?: React.Dispatch<React.SetStateAction<number>>;
  images?: DocumentModel[];
  setImages?: React.Dispatch<React.SetStateAction<DocumentModel[]>>;
  serial?: string;
  setSerial?: React.Dispatch<React.SetStateAction<string>>;
  units?;
  setUnits?: React.Dispatch<React.SetStateAction<any>>;
}

export default function CreateProductForm({
  name = '',
  setName,
  category = null,
  setCategory,
  description = '',
  setDescription,
  stock = null,
  setStock,
  price = null,
  setPrice,
  images = [],
  setImages,
  serial = '',
  setSerial,
  units,
  setUnits,
}: CreateProductFormProps) {
  return (
    <div>
      <div>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder=""
          className="w-3/4 h-8 my-1 text-sm "
          value={name}
          setValue={setName}
          label="Nombre del Producto"
        />
      </div>
      <div className="mt-8">
        <h2 className="font-bold">Categoria</h2>
        <CategorySelector category={category} setCategory={setCategory} />
      </div>
      <div className="mt-8">
        <Input
          type="text"
          id="description"
          name="description"
          placeholder=""
          className="w-3/4 h-8 my-1 text-sm "
          value={description}
          setValue={setDescription}
          label="Descripcion"
        />
      </div>
      <div className="mt-8">
        <Input
          type="text"
          id="stock"
          name="stock"
          placeholder=""
          className="w-3/4 h-8 my-1 text-sm "
          value={stock}
          setValue={setStock}
          label="En Stock"
        />
      </div>
      <div className="mt-8">
        <Input
          type="text"
          id="price"
          name="price"
          placeholder=""
          className="w-3/4 h-8 my-1 text-sm "
          value={price}
          setValue={setPrice}
          label="Precio"
        />
      </div>
      <div className="mt-8">
        <Input
          type="text"
          id="serial"
          name="serial"
          placeholder=""
          className="w-3/4 h-8 my-1 text-sm "
          value={serial}
          setValue={setSerial}
          label="Serial del Producto"
        />
      </div>
      <div className="mt-8">
        <h2 className="mb-1 font-bold">Presentacion del producto</h2>
        <UnitsDropdown units={units} setUnits={setUnits} />
      </div>
      <div className="mt-8">
        <h2 className="mb-1 font-bold">Imagenes del Producto</h2>
        <DocumentForm
          updateURLs={setImages}
          documents={images}
          fileType="img"
        />
      </div>
    </div>
  );
}
