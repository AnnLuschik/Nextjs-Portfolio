import { useState } from 'react';
import Link from 'next/link';

import styles from 'styles/Navbar.module.css';
import RightNav from './RightNav';
import Burger from './Burger';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <nav className="navbar navbar-expand-lg navbar-dark fj-mw9">
        <Link href="/" className="navbar-brand mr-3 font-weight-bold">
          JohnDoe
        </Link>

        <RightNav open={open} />

        <Burger onClick={() => setOpen(!open)} />
      </nav>
    </div>
  );
};

export default NavBar;
