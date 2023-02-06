import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Components
import Redirect from 'components/shared/Redirect';
import LoginForm from 'components/forms/LoginForm';

// Hooks
import { useSignIn } from 'apollo/hooks';

// Misc
import { getErrorMessage, disposeQueryMessage } from 'helpers';
import { messages } from 'constants/messages';

const Login = () => {
  const router = useRouter();
  const { message } = router.query;

  const [signIn, { data, error, loading }] = useSignIn();

  disposeQueryMessage(message);

  return (
    <>
      <Head>
        <title>Portfolios App - Log In</title>
      </Head>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Login</h1>
            {message && (
              <div className={`alert alert-${messages[message].status}`}>
                {messages[message].value}
              </div>
            )}
            <LoginForm
              onSubmit={(signInData) => signIn({ variables: signInData })}
              isLoading={loading}
            />
            {data?.signIn && <Redirect to="/" />}
            {error && (
              <div className="alert alert-danger">{getErrorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
