import React from 'react';
import Footer from '../../components/common/Footer';
import Create from '../../components/manageProducts/Create';
import Nav from '../../components/Navbar/Nav';
import { useUser } from '../../hooks/useUser';

export default function CreatePage() {
  const [user] = useUser();
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Nav setOpen={setOpen} open={open} />
      {!user || user?.role !== 2 ? (
        <div className="min-h-screen">
          <h2>No tienes permiso para ver esta página.</h2>
        </div>
      ) : (
        <Create />
      )}
      <Footer />
    </div>
  );
}
