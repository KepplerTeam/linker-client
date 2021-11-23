import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../../components/common/Footer';
import NewEnterpriseForm from '../../../components/enterprise/NewEnterpriseForm';
import Nav from '../../../components/Navbar/Nav';
import { GET_ENTERPRISE } from '../../../graphql/queries';
import { useUser } from '../../../hooks/useUser';
import { Enterprise } from '../../../models';

export default function UpdateEnterprisePage() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [user] = useUser();
  const { data, loading } = useQuery<{ enterprise: Enterprise }>(
    GET_ENTERPRISE,
    {
      variables: { filter: { _id: router.query._id } },
      fetchPolicy: 'network-only',
    }
  );
  return (
    <>
      {loading ? (
        <div>
          <h2>loading...</h2>
        </div>
      ) : (
        <div>
          <Nav open={open} setOpen={setOpen} />
          {!user || user?._id !== data?.enterprise?.owner?._id ? (
            <div className="min-h-screen">
              <h2>No tienes permiso para ver esta página.</h2>
            </div>
          ) : (
            <NewEnterpriseForm
              isUpdate
              enterprise={data?.enterprise}
              user={user}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
}
