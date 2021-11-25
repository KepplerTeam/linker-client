import React from 'react';
import CheckoutPageComponent from '../../components/checkout/CheckoutPageComponent';
import Footer from '../../components/common/Footer';
import Nav from '../../components/Navbar/Nav';

export default function CheckoutPage() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-gray-200">
      <Nav open={open} setOpen={setOpen} />
      <CheckoutPageComponent />
    </div>
  );
}
