import { useQuery } from '@apollo/client';

// Components
import Redirect from 'components/shared/Redirect';
import SpinnerLoader from 'components/shared/Loader';

// Misc
import { GET_USER } from 'apollo/queries';
import { PATH_LOGIN } from 'constants/paths';

export default function withAuth(
  WrappedComponent,
  roles,
  options = { ssr: false }
) {
  const WithAuth = (props) => {
    const {
      data: { user } = {},
      error,
      loading
    } = useQuery(GET_USER, {
      fetchPolicy: 'network-only'
    });

    if (!loading && (!user || error) && typeof window !== 'undefined') {
      return (
        <Redirect to={PATH_LOGIN} query={{ message: 'NOT_AUTHENTICATED' }} />
      );
    }

    if (user) {
      if (roles.length && !roles.includes(user.role)) {
        return (
          <Redirect to={PATH_LOGIN} query={{ message: 'NOT_AUTHORIZED' }} />
        );
      }
      const componentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';

      WithAuth.displayName = `withAuth(${componentName})`;

      return <WrappedComponent {...props} />;
    }

    if (options.ssr) {
      const serverRedirect = (res, to) => {
        res.redirect(to);
        res.end();
        return {};
      };

      WithAuth.getInitialProps = async (context) => {
        const { req, res } = context;
        if (req) {
          const { user } = req;

          if (!user) {
            serverRedirect(res, `${PATH_LOGIN}?message=NOT_AUTHENTICATED`);
          }

          if (roles.length && !roles.includes(user.role)) {
            serverRedirect(res, `${PATH_LOGIN}?message=NOT_AUTHORIZED`);
          }
        }

        const pageProps =
          WrappedComponent.getInitialProps &&
          (await WrappedComponent.getInitialProps(context));

        return { ...pageProps };
      };
    }

    return <SpinnerLoader />;
  };

  return WithAuth;
}
