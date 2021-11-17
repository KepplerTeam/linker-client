import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/common/Footer';
import Create from '../../components/manageProducts/Create';
import Nav from '../../components/Navbar/Nav';
import { useUser } from '../../hooks/useUser';

export default function AddProductToEnterprise() {
  const router = useRouter();
  const [user] = useUser();
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      {!user ? (
        <div>
          <Nav open={open} setOpen={setOpen} />
          <div className="min-h-screen">
            <h2>No tiene acceso a esta pagina</h2>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <Nav open={open} setOpen={setOpen} />
          <Create enterpriseId={router.query._id} />
          <Footer />
        </div>
      )}
    </div>
  );
}
