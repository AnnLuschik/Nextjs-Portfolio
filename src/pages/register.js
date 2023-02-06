import { useMutation } from '@apollo/client';
import Head from 'next/head';

// Components
import RegisterForm from 'components/forms/RegisterForm';
import Redirect from 'components/shared/Redirect';

// Misc
import { SIGN_UP } from 'apollo/mutations/index';
import { getErrorMessage } from 'helpers';
import { PATH_LOGIN } from 'constants/paths';

const Register = () => {
  const [signUpUser, { data, error, loading }] = useMutation(SIGN_UP, {
    errorPolicy: 'all'
  });

  const register = (registerData) => {
    signUpUser({ variables: registerData });
  };

  return (
    <>
      <Head>
        <title>Portfolios App - Sign Up</title>
      </Head>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Register</h1>
            <RegisterForm onSubmit={register} isLoading={loading} />
            {data?.signUp && (
              <Redirect to={PATH_LOGIN} query={{ message: 'LOGGED_IN' }} />
            )}
            {error && (
              <div className="alert alert-danger">{getErrorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
