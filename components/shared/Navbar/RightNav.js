import Link from 'next/link';
import styles from 'styles/Navbar.module.css';

const RightNav = ({ open }) => {
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
      </ul>
    </div>
  );
};

export default RightNav;
