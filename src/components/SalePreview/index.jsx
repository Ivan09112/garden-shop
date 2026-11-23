import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { hasDiscount, shuffle } from '../../utils';
import SectionHeader from '../SectionHeader';
import ProductCard from '../ProductCard';
import StatusMessage from '../StatusMessage';
import styles from './SalePreview.module.css';

// Блок «Sale» на главной — 4 случайных товара со скидкой
function SalePreview() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.products.all);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [dispatch, status]);

  const saleProducts = useMemo(
    () => shuffle(list.filter(hasDiscount)).slice(0, 4),
    [list]
  );

  return (
    <section className={`container ${styles.section}`}>
      <SectionHeader title="Sale" linkText="All sales" linkTo="/sales" />
      {status === 'succeeded' ? (
        <ul className={styles.list}>
          {saleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <StatusMessage status={status} error={error} />
      )}
    </section>
  );
}

export default SalePreview;
