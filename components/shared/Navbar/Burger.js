import styles from 'styles/Navbar.module.css';

const Burger = ({ onClick, expanded }) => {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls="main-menu"
      className={styles.burger}
      onClick={onClick}
    >
      <div />
      <div />
      <div />
    </button>
  );
};

export default Burger;
