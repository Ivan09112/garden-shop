import { Link } from 'react-router-dom';
import hero from '../../assets/images/hero.jpg';
import styles from './HeroBanner.module.css';

function HeroBanner() {
  return (
    <section
      className={styles.banner}
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>Amazing Discounts on Garden Products!</h1>
        <Link to="/sales" className={styles.button}>
          Check out
        </Link>
      </div>
    </section>
  );
}

export default HeroBanner;
