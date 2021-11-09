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
      <NewEnterpriseForm user={user} />
      <Footer />
    </div>
  );
}
