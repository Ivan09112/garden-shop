import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getImageUrl } from '../../api';
import { addToCart, selectCartItems } from '../../store/slices/cartSlice';
import {
  formatPrice,
  getDiscountPercent,
  getFinalPrice,
  hasDiscount,
} from '../../utils';
import styles from './ProductCard.module.css';

function ProductCard({ product, withButton = true }) {
  const dispatch = useDispatch();
  const inCart = useSelector(selectCartItems).some(
    (item) => item.id === product.id
  );
  const discount = hasDiscount(product);

  const handleAdd = (event) => {
    // карточка — это ссылка, кнопка не должна открывать страницу товара
    event.preventDefault();
    event.stopPropagation();
    if (!inCart) dispatch(addToCart({ product }));
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(product.image)}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />

        {discount && (
          <span className={styles.badge}>-{getDiscountPercent(product)}%</span>
        )}

        {withButton && (
          <button
            type="button"
            className={`${styles.button} ${inCart ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {inCart ? 'Added' : 'Add to cart'}
          </button>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title} title={product.title}>
          {product.title}
        </h3>
        <div className={styles.prices}>
          <span className={styles.price}>
            {formatPrice(getFinalPrice(product))}
          </span>
          {discount && (
            <span className={styles.oldPrice}>
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
