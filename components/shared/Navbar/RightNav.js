import Link from 'next/link';

import styles from 'styles/Navbar.module.css';
import withApollo from 'hoc/withApollo';
import { useUser } from 'hooks/useUser';

const RightNav = ({ open }) => {
  const user = useUser();

  return (
    <div className={`${styles.rightNav} ${open ? styles.open : ''}`}>
      <ul>
        <li>
          <Link href="/portfolios">
            <a>Portfolios</a>
          </Link>
        </li>
        <li>
          <Link href="/forum/categories">
            <a>Forum</a>
          </Link>
        </li>
        <li>
          <Link href="/cv">
            <a>Cv</a>
          </Link>
        </li>
      </ul>

      <ul>
        {user ? (
          <>
            <li>
              <span className="nav-link mr-4">Welcome {user.username}</span>
            </li>
            <li className={`${styles.button} ${styles.alert}`}>
              <Link href="/logout">
                <a>Sign Out</a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">
                <a>Sign In</a>
              </Link>
            </li>
            <li className={styles.button}>
              <Link href="/register">
                <a>Sign Up</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withApollo(RightNav);
