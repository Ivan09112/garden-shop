import { Link } from 'react-router-dom';
import four from '../../assets/icons/four.svg';
import notFoundImage from '../../assets/images/not-found.png';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={`container ${styles.page}`}>
      <div className={styles.code} aria-label="404">
        <img src={four} alt="" className={styles.digit} />
        <img src={notFoundImage} alt="" className={styles.image} />
        <img src={four} alt="" className={styles.digit} />
      </div>

      <div className={styles.text}>
        <h1 className="title-h1">Page Not Found</h1>
        <p className={styles.message}>
          We’re sorry, the page you requested could not be found.
          <br />
          Please go back to the homepage.
        </p>
      </div>

      <Link to="/" className={styles.button}>
        Go Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
