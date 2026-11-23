import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { useProductsFilter } from '../../hooks/useProductsFilter';
import ProductsFilter from '../../components/ProductsFilter';
import ProductsList from '../../components/ProductsList';
import StatusMessage from '../../components/StatusMessage';
import styles from './AllProductsPage.module.css';

function AllProductsPage() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.products.all);
  const { filters, changeFilter, filtered } = useProductsFilter(list);

  useEffect(() => {
    if (status !== 'succeeded') dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className={`container page ${styles.page}`}>
      <h1 className="title-h1">All products</h1>
      <ProductsFilter filters={filters} onChange={changeFilter} />
      {status === 'succeeded' ? (
        <ProductsList products={filtered} />
      ) : (
        <StatusMessage status={status} error={error} />
      )}
    </section>
  );
}

export default AllProductsPage;
