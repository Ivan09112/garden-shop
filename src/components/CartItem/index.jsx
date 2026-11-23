import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getImageUrl } from '../../api';
import {
  decrement,
  increment,
  removeFromCart,
} from '../../store/slices/cartSlice';
import { formatPrice, hasDiscount } from '../../utils';
import QuantityCounter from '../QuantityCounter';
import styles from './CartItem.module.css';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const discount = hasDiscount(item);
  const price = (item.discont_price ?? item.price) * item.count;

  return (
    <li className={styles.item}>
      <Link to={`/products/${item.id}`} className={styles.imageWrapper}>
        <img
          src={getImageUrl(item.image)}
          alt={item.title}
          className={styles.image}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.head}>
          <Link to={`/products/${item.id}`} className={styles.title}>
            {item.title}
          </Link>
          <button
            type="button"
            className={styles.remove}
            onClick={() => dispatch(removeFromCart(item.id))}
            aria-label="Remove from cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.bottom}>
          <QuantityCounter
            value={item.count}
            onDecrement={() => dispatch(decrement(item.id))}
            onIncrement={() => dispatch(increment(item.id))}
          />
          <div className={styles.prices}>
            <span className={styles.price}>{formatPrice(price)}</span>
            {discount && (
              <span className={styles.oldPrice}>
                {formatPrice(item.price * item.count)}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
