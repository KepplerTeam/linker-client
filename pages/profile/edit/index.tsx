import React from 'react';
import Footer from '../../../components/common/Footer';
import Nav from '../../../components/Navbar/Nav';
import ProfileEditForm from '../../../components/profile/ProfileEditForm';

export default function EditProfilePage() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Nav open={open} setOpen={setOpen} />
      <ProfileEditForm />
      <Footer />
    </div>
  );
}
