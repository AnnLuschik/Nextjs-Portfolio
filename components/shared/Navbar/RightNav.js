import Link from 'next/link';
import styles from 'styles/Navbar.module.css';

const RightNav = ({ open }) => {
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
        <li>
          <Link href="/login">Sign In</Link>
        </li>
        <li className={styles.button}>
          <Link href="/register">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
};

export default RightNav;
