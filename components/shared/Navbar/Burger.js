import styles from 'styles/Navbar.module.css';

const Burger = ({ onClick, expanded }) => {
  return (
    <button
      type="button"
      aria-label={expanded ? 'Close the menu' : 'Open the menu'}
      aria-expanded={expanded}
      aria-controls="main-menu"
      className={styles.burger}
      onClick={onClick}
    >
      <div aria-hidden="true" />
      <div aria-hidden="true" />
      <div aria-hidden="true" />
    </button>
  );
};

export default Burger;
