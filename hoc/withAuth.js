import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_USER } from 'apollo/queries';

export default function withAuth(WrappedComponent, roles) {
  const WithAuth = (props) => {
    const {
      data: { user } = {},
      error,
      loading
    } = useQuery(GET_USER, {
      fetchPolicy: 'network-only'
    });

    const router = useRouter();

    if (!loading && (!user || error) && typeof window !== 'undefined') {
      router.push('/');
      return null;
    }

    if (user) {
      if (roles.length && !roles.includes(user.role)) {
        router.push('/');
        return null;
      }
      const componentName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';

      WithAuth.displayName = `withAuth(${componentName})`;

      return <WrappedComponent {...props} />;
    }

    return <p>Authenticating...</p>;
  };

  return WithAuth;
}
