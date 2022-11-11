import { useRouter } from 'next/router';
import { useUser } from 'hooks/useUser';

export default function withRole(Component, role) {
  const WithRole = (props) => {
    const user = useUser();
    const router = useRouter();

    if (user) {
      const userRole = user.role;
      if (userRole && userRole !== role) {
        router.replace('/');
        return null;
      }

      return <Component {...props} />;
    }

    const componentName =
      Component.displayName || Component.name || 'Component';

    WithRole.displayName = `withRole(${componentName})`;

    return null;
  };

  return WithRole;
}
