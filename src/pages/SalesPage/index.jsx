import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { useProductsFilter } from '../../hooks/useProductsFilter';
import { hasDiscount } from '../../utils';
import ProductsFilter from '../../components/ProductsFilter';
import ProductsList from '../../components/ProductsList';
import StatusMessage from '../../components/StatusMessage';
import styles from './SalesPage.module.css';

function SalesPage() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.products.all);
  const saleProducts = useMemo(() => list.filter(hasDiscount), [list]);
  const { filters, changeFilter, filtered } = useProductsFilter(saleProducts);

  useEffect(() => {
    if (status !== 'succeeded') dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className={`container page ${styles.page}`}>
      <h1 className="title-h1">Discounted items</h1>
      {/* на странице скидок чекбокс «Discounted items» не нужен */}
      <ProductsFilter
        filters={filters}
        onChange={changeFilter}
        showDiscount={false}
      />
      {status === 'succeeded' ? (
        <ProductsList products={filtered} />
      ) : (
        <StatusMessage status={status} error={error} />
      )}
    </section>
  );
}

export default SalesPage;
