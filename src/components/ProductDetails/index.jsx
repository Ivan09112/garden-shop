import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImageUrl } from '../../api';
import { addToCart } from '../../store/slices/cartSlice';
import {
  formatPrice,
  getDiscountPercent,
  getFinalPrice,
  hasDiscount,
} from '../../utils';
import QuantityCounter from '../QuantityCounter';
import styles from './ProductDetails.module.css';

function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);
  const discount = hasDiscount(product);

  const handleAdd = () => {
    dispatch(addToCart({ product, count }));
    setAdded(true);
    setCount(1);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className={`container ${styles.product}`}>
      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(product.image)}
          alt={product.title}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <h1 className="title-h2">{product.title}</h1>

        <div className={styles.prices}>
          <span className={styles.price}>
            {formatPrice(getFinalPrice(product))}
          </span>
          {discount && (
            <>
              <span className={styles.oldPrice}>
                {formatPrice(product.price)}
              </span>
              <span className={styles.badge}>
                -{getDiscountPercent(product)}%
              </span>
            </>
          )}
        </div>

        <div className={styles.actions}>
          <QuantityCounter
            value={count}
            onDecrement={() => setCount((prev) => Math.max(1, prev - 1))}
            onIncrement={() => setCount((prev) => prev + 1)}
          />
          <button
            type="button"
            className={`${styles.button} ${added ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {added ? 'Added' : 'Add to cart'}
          </button>
        </div>

        <div className={styles.description}>
          <h2 className={styles.descriptionTitle}>Description</h2>
          <p className={styles.descriptionText}>{product.description}</p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
