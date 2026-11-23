import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/slices/productsSlice';
import ProductDetails from '../../components/ProductDetails';
import StatusMessage from '../../components/StatusMessage';
import NotFoundPage from '../NotFoundPage';
import styles from './ProductPage.module.css';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item, status, error } = useSelector(
    (state) => state.products.current
  );

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (status === 'failed' && /not found|wrong/.test(error)) {
    return <NotFoundPage />;
  }

  return (
    <div className={`page ${styles.page}`}>
      {status === 'succeeded' && item ? (
        <ProductDetails key={item.id} product={item} />
      ) : (
        <StatusMessage status={status} error={error} />
      )}
    </div>
  );
}

export default ProductPage;
