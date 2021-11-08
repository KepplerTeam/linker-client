import React from 'react';
import { Bill } from '../../models';

interface OrderDetailsProps {
  //   bill: Bill;
  bill;
}

export default function OrderDetails() {
  const billPrueba = [
    {
      product: [
        {
          _id: 1,
          name: 'Producto 1',
          serial: '123',
          description: 'lorem ipsum',
          price: 13.99,
        },
        {
          _id: 2,
          name: 'Producto 2',
          serial: '1234',
          description: 'lorem1 ipsum',
          price: 3.99,
        },
        {
          _id: 3,
          name: 'Producto 3',
          serial: '12345',
          description: 'lorem2 ipsum',
          price: 22.99,
        },
      ],
      totalPrice: 13.99 + 3.99 + 22.99,
      _id: 1,
    },
  ];
  return (
    <div className="min-h-screen p-4">
      <div>
        {billPrueba.map((m) => (
          <div>
            {m.product.map((prod) => (
              <div>
                <h2>{prod.name}</h2>
                
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
