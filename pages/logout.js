import { useEffect } from 'react';
import { useRouter } from 'next/router';

// import withApollo from 'hoc/withApollo';
import { useSignOut } from 'apollo/hooks';
import { PATH_LOGIN } from 'constants/paths';

const Logout = () => {
  const router = useRouter();
  const [signOut, { client }] = useSignOut();

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => router.replace(PATH_LOGIN));
    });
  }, []);

  return (
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">Logout</h1>
          <p>Signing out...</p>
        </div>
      </div>
    </div>
  );
};

// export default withApollo(Logout);
export default Logout;
