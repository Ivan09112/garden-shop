import { Link } from 'react-router-dom';
import styles from './EmptyCart.module.css';

function EmptyCart() {
  return (
    <div className={styles.empty}>
      <p>Looks like you have no items in your basket currently.</p>
      <Link to="/products" className={styles.button}>
        Continue Shopping
      </Link>
    </div>
  );
}

export default EmptyCart;
