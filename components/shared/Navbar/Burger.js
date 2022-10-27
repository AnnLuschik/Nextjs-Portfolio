import styles from 'styles/Navbar.module.css';

const Burger = ({ onClick }) => {
  return (
    <button type="button" className={styles.burger} onClick={onClick}>
      <div />
      <div />
      <div />
    </button>
  );
};

export default Burger;
