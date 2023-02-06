import CircularProgress from '@mui/material/CircularProgress';

import styles from 'styles/Loader.module.css';

const SpinningLoader = () => (
  <div className={styles.wrapper}>
    <CircularProgress />
  </div>
);

export default SpinningLoader;
