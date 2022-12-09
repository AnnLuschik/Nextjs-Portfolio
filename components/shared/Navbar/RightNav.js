import { useState, useEffect } from 'react';
import Link from 'next/link';

// Components
import Actions from 'components/shared/Navbar/Actions';

// Hooks
import { useLazyGetUser } from 'apollo/hooks';

// Styles
import styles from 'styles/Navbar.module.css';

// Misc
// import withApollo from 'hoc/withApollo';
import {
  PATH_CATEGORIES,
  PATH_CV,
  PATH_LOGIN,
  PATH_LOGOUT,
  PATH_PORTFOLIOS,
  PATH_SIGNUP
} from 'constants/paths';

const RightNav = ({ open }) => {
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [getUser, { data }] = useLazyGetUser();

  const role = user?.role;
  const hasPermissions = role === 'admin' || role === 'instructor';

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) {
      setUser(data.user);
    }
    if (!data.user && user) {
      setUser(null);
    }
    if (!hasResponse) {
      setHasResponse(true);
    }
  }

  return (
    <div className={`${styles.rightNav} ${open ? styles.open : ''}`}>
      <ul>
        <li>
          <Link href={PATH_PORTFOLIOS}>Portfolios</Link>
        </li>
        <li>
          <Link href={PATH_CATEGORIES}>Forum</Link>
        </li>
        <li>
          <Link href={PATH_CV}>Cv</Link>
        </li>
      </ul>
      {hasResponse && (
        <ul>
          {user ? (
            <>
              <li>
                <span className="nav-link mr-4">Welcome {user.username}</span>
              </li>
              {hasPermissions && (
                <li>
                  <Actions user={user} />
                </li>
              )}
              <li className={`${styles.button} ${styles.alert}`}>
                <Link href={PATH_LOGOUT}>Sign Out</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={PATH_LOGIN}>Sign In</Link>
              </li>
              <li className={styles.button}>
                <Link href={PATH_SIGNUP}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

// export default withApollo(RightNav);
export default RightNav;
