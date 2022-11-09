import { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import RegisterForm from 'components/forms/RegisterForm';
import { SIGN_UP } from 'apollo/mutations/index';
import withApollo from 'hoc/withApollo';
import { getErrorMessage } from 'helpers';

const Register = () => {
  const router = useRouter();
  const [signUpUser, { data, error, loading }] = useMutation(SIGN_UP);

  const register = (registerData) => {
    signUpUser({ variables: registerData });
  };

  useEffect(() => {
    if (data && data.signUp) {
      router.push('/login');
    }
  }, [data]);

  return (
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">Register</h1>
          <RegisterForm onSubmit={register} isLoading={loading} />
          {error && (
            <div className="alert alert-danger">{getErrorMessage(error)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withApollo(Register);
