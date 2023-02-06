import { useState } from 'react';
import Link from 'next/link';

// Components
import RightNav from 'components/shared/Navbar/RightNav';
import Burger from 'components/shared/Navbar/Burger';

// Styles
import styles from 'styles/Navbar.module.css';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <nav
        role="navigation"
        aria-label="Main menu"
        className="navbar navbar-expand-lg navbar-dark fj-mw9"
      >
        <Link href="/" className="navbar-brand mr-3 font-weight-bold">
          JohnDoe
        </Link>

        <RightNav open={open} />

        <Burger onClick={() => setOpen(!open)} expanded={open} />
      </nav>
    </div>
  );
};

export default NavBar;
