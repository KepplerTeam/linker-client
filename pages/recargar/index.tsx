import React from 'react';
import Footer from '../../components/common/Footer';
import Nav from '../../components/Navbar/Nav';
import RecargaPageComponent from '../../components/recargas/RecargaPageComponent';

export default function RecargasPage() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Nav open={open} setOpen={setOpen} />
      <RecargaPageComponent />
      <Footer />
    </div>
  );
}
