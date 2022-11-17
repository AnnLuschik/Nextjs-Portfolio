import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// Components
import Redirect from 'components/shared/Redirect';
import LoginForm from 'components/forms/LoginForm';
import withApollo from 'hoc/withApollo';

// Hooks
import { useSignIn } from 'apollo/hooks';

// Misc
import { getErrorMessage } from 'helpers';
import { messages } from 'constants/messages';

const Login = () => {
  const router = useRouter();
  const { message } = router.query;

  const [signIn, { data, error, loading }] = useSignIn();

  const disposeId = useRef(null);

  const disposeMessage = () => {
    router.replace('/login', '/login', { shallow: true });
  };

  useEffect(() => {
    if (message) {
      disposeId.current = setTimeout(() => {
        disposeMessage();
      }, 3000);
    }

    return () => {
      clearInterval(disposeId);
    };
  }, [message]);

  return (
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
          {data && data.signIn && <Redirect to="/" />}
          {error && (
            <div className="alert alert-danger">{getErrorMessage(error)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withApollo(Login);
