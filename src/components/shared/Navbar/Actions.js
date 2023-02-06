import * as React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import styles from 'styles/Navbar.module.css';
import { PATH_CREATE_PORTFOLIO, PATH_DASHBOARD } from 'constants/paths';

const ActionsMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { _id: userId } = user;

  return (
    <div>
      <Button
        id="basic-button"
        className={styles.menuButton}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        Manage
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {[
          <Link href={PATH_CREATE_PORTFOLIO} key="newPortfolio">
            <MenuItem onClick={handleClose}>Create Portfolio</MenuItem>
          </Link>,
          <Link
            href={{
              pathname: PATH_DASHBOARD,
              query: { id: userId }
            }}
            key="dashboard"
          >
            <MenuItem onClick={handleClose}>Dashboard</MenuItem>
          </Link>
        ]}
      </Menu>
    </div>
  );
};

export default ActionsMenu;
