import React from 'react';
import Footer from '../../components/common/Footer';
import NewEnterpriseForm from '../../components/enterprise/NewEnterpriseForm';
import Nav from '../../components/Navbar/Nav';
import { useUser } from '../../hooks/useUser';

export default function RegisterEnterprise() {
  const [user] = useUser();
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Nav open={open} setOpen={setOpen} />
      {!user || user?.role !== 2 ? (
        <div className="min-h-screen">
          <h2>No tienes permiso para ver esta página.</h2>
        </div>
      ) : (
      <NewEnterpriseForm user={user} />
      )}
      <Footer />
    </div>
  );
}
