import React from 'react';
import Footer from '../../components/common/Footer';
import Nav from '../../components/Navbar/Nav';
import ProfilePageComponent from '../../components/profile/ProfilePageComponent';
import { useUser } from '../../hooks/useUser';

export default function ProfilePage() {
  const [open, setOpen] = React.useState(false);
  const [user] = useUser();

  return (
    <div>
      <Nav open={open} setOpen={setOpen} />
      <ProfilePageComponent user={user} />
      <Footer />
    </div>
  );
}
