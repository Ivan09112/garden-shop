import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryProducts } from '../../store/slices/productsSlice';
import { useProductsFilter } from '../../hooks/useProductsFilter';
import ProductsFilter from '../../components/ProductsFilter';
import ProductsList from '../../components/ProductsList';
import StatusMessage from '../../components/StatusMessage';
import NotFoundPage from '../NotFoundPage';
import styles from './CategoryProductsPage.module.css';

function CategoryProductsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info, list, status, error } = useSelector(
    (state) => state.products.category
  );
  const { filters, changeFilter, filtered } = useProductsFilter(list);

  useEffect(() => {
    dispatch(fetchCategoryProducts(id));
  }, [dispatch, id]);

  // несуществующая категория
  if (status === 'failed' && /empty|wrong/.test(error)) {
    return <NotFoundPage />;
  }

  return (
    <section className={`container page ${styles.page}`}>
      <h1 className="title-h1">{info?.title ?? ' '}</h1>
      <ProductsFilter filters={filters} onChange={changeFilter} />
      {status === 'succeeded' ? (
        <ProductsList products={filtered} />
      ) : (
        <StatusMessage status={status} error={error} />
      )}
    </section>
  );
}

export default CategoryProductsPage;
