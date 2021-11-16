import React from 'react';
import { useRouter } from 'next/router';
import RightArrowIcon from '../icons/RightArrowIcon';
import HeartIcon from '../icons/HeartIcon';

interface ProductHomeInfoProps {
  name: string;
  images: string;
  _id: string;
}

export default function ProductHomeInfo({
  name = 'TMA-2 Modular Headphone',
  images = 'data:image/jpeg;base64,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',
  _id = '1',
}: ProductHomeInfoProps) {
  const router = useRouter();

  return (
    <>
      <div className="card items-center justify-between min-w-full mr-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/product/${_id}`);
          }}
        >
          <div className="w-full h-full">
            <div className="flex flex-row w-full">
              <div className="w-1/2 z-20">
                <p className="font-bold break-normal">{name}</p>
              </div>
              <div className="w-1/2">
                <img src={images} alt={name} className="w-full h-auto" />
              </div>
            </div>
            <div className="flex flex-row text-primary-100 space-x-2">
              <div className="">
                <h2 className="font-bold">Shop Now</h2>
              </div>
              <div className="">
                <RightArrowIcon className="w-4 h-4 mt-1" />
              </div>
            </div>
          </div>
        </button>
        <button>
            <HeartIcon className="w-4 h-4 text-gray-300 hover:text-gray-500 active:text-red-500"/>
        </button>
      </div>
    </>
  );
}
