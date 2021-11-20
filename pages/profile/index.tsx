import { useQuery } from '@apollo/client';
import React from 'react';
import Footer from '../../components/common/Footer';
import Nav from '../../components/Navbar/Nav';
import ProfilePageComponent from '../../components/profile/ProfilePageComponent';
import { GET_ENTERPRISES } from '../../graphql/queries';
import { useUser } from '../../hooks/useUser';
import { Enterprise } from '../../models';

export default function ProfilePage() {
  const [open, setOpen] = React.useState(false);
  const [user] = useUser();
  const { data, loading } = useQuery<{ enterprises: Enterprise[] }>(
    GET_ENTERPRISES,
    { variables: { filter: { owner: user?._id } }, fetchPolicy: 'network-only' }
  );

  return (
    <div>
      <Nav open={open} setOpen={setOpen} />
      {loading ? (
        <div>
          <h2>loading...</h2>
        </div>
      ) : (
        <ProfilePageComponent user={user} enterprise={data?.enterprises} />
      )}
      <Footer />
    </div>
  );
}
