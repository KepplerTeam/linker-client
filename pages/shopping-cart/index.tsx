import React from 'react';
import { useRouter } from 'next/router';
import CartProduct from '../../components/shoppingCart/CartProduct';
import TitleBar from '../../components/common/TitleBar';
import { useUser } from '../../hooks/useUser';
import Nav from '../../components/Navbar/Nav';
import Footer from '../../components/common/Footer';
import RightArrowIcon from '../../components/icons/RightArrowIcon';

export default function ShoppingCartPage() {
  const [user] = useUser();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [cart] = React.useState(user?.shoppingCart?.products);
  const totalPrice = user?.shoppingCart?.products?.reduce(
    (sum, { price }) => sum + price,
    0
  );
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (user?.shoppingCart?.products?.length < 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, []);

  return (
    <>
      <div className="w-screen min-h-screen p-0 bg-gray-200">
        <div>
          <Nav open={open} setOpen={setOpen} />
          <div className="bg-gray-100 flex justify-center">
            <h2 className=" font-semibold text-2xl p-4">Mi Carrito</h2>
          </div>
          <div className="border-t-2 shadow-inner p-6 pb-48">
            {user?.shoppingCart?.products.map((e, idx) => (
              <CartProduct product={e} key={idx} hasTrashIcon />
            ))}
          </div>
          <div className="w-full flex-col bg-gray-50 shadow-lg rounded-t-3xl pt-6 fixed bottom-0">
            <div className="flex flex-col ml-14 m-2 px-8">
              <div className="flex flex-row items-center mb-4 text-xl">
                <h4 className="font-black">CANTIDAD: &nbsp;</h4>
                <h6 className="font-bold text-primary-700">
                  {user?.shoppingCart?.products.length}
                </h6>
              </div>
              <div className="flex flex-row items-center mb-4 text-xl">
                <h4 className="font-black">SUBTOTAL: &nbsp;</h4>
                <h6 className="font-bold text-primary-700">
                  ${Math.round(totalPrice * 100) / 100}
                </h6>
              </div>
            </div>
            <div className="px-16 pb-6">
              <button
                className={`flex flex-row items-center justify-between  py-3 px-8 rounded-2xl font-bold text-white w-11/12 mx-auto ${
                  disabled
                    ? 'bg-gray-200 text-gray-300'
                    : 'bg-primary-100 hover:bg-primary-600'
                }`}
                type="button"
                onClick={() => router.push('/checkout')}
                disabled={disabled}
              >
                Proceder a pago
                <RightArrowIcon className="font-bold h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
