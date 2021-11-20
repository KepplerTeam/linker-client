import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/common/Footer';
import EnterpriseProfile from '../../components/enterprise/EnterpriseProfile';
import Nav from '../../components/Navbar/Nav';
import { GET_ENTERPRISE } from '../../graphql/queries';
import { useUser } from '../../hooks/useUser';
import { Enterprise } from '../../models';

export default function EnterpriseProfilePage() {
  const [user] = useUser();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const { data, loading } = useQuery<{ enterprise: Enterprise }>(
    GET_ENTERPRISE,
    {
      variables: { filter: { _id: router.query._id } },
      fetchPolicy: 'network-only',
    }
  );
  return (
    <div>
      {loading ? (
        <div>
          <h2>loading...</h2>
        </div>
      ) : (
        <div className="bg-gray-200">
          <Nav open={open} setOpen={setOpen} />
          <EnterpriseProfile user={user} enterprise={data?.enterprise} />
          <Footer />
        </div>
      )}
    </div>
  );
}
