import Link from 'next/link';

import styles from 'styles/Navbar.module.css';
import withApollo from 'hoc/withApollo';
import { useUser } from 'hooks';

const RightNav = ({ open }) => {
  const user = useUser();

  return (
    <div className={`${styles.rightNav} ${open ? styles.open : ''}`}>
      <ul>
        <li>
          <Link href="/portfolios">Portfolios</Link>
        </li>
        <li>
          <Link href="/forum/categories">Forum</Link>
        </li>
        <li>
          <Link href="/cv">Cv</Link>
        </li>
      </ul>

      <ul>
        {user ? (
          <>
            <li>
              <span className="nav-link mr-4">Welcome {user.username}</span>
            </li>
            <li className={`${styles.button} ${styles.alert}`}>
              <Link href="/logout">Sign Out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Sign In</Link>
            </li>
            <li className={styles.button}>
              <Link href="/register">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withApollo(RightNav);
