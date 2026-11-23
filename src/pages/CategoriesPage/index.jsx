import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import CategoryCard from '../../components/CategoryCard';
import StatusMessage from '../../components/StatusMessage';
import styles from './CategoriesPage.module.css';

function CategoriesPage() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle' || status === 'failed') dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className={`container page ${styles.page}`}>
      <h1 className="title-h1">Categories</h1>
      {status === 'succeeded' ? (
        <ul className={styles.list}>
          {list.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      ) : (
        <StatusMessage status={status} error={error} />
      )}
    </section>
  );
}

export default CategoriesPage;
