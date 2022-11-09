import { useEffect } from 'react';
import { useRouter } from 'next/router';

import LoginForm from 'components/forms/LoginForm';
import withApollo from 'hoc/withApollo';
import { useSignIn } from 'apollo/hooks';
import { getErrorMessage } from 'helpers';

const Login = () => {
  const router = useRouter();
  const [signIn, { data, error, loading }] = useSignIn();

  useEffect(() => {
    if (data && data.signIn) {
      router.push('/');
    }
  }, [data]);

  return (
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">Login</h1>
          <LoginForm
            onSubmit={(signInData) => signIn({ variables: signInData })}
            isLoading={loading}
          />
          {error && (
            <div className="alert alert-danger">{getErrorMessage(error)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withApollo(Login);
