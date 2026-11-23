import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import SectionHeader from '../SectionHeader';
import CategoryCard from '../CategoryCard';
import StatusMessage from '../StatusMessage';
import styles from './CategoriesPreview.module.css';

// Блок «Categories» на главной — первые 4 категории
function CategoriesPreview() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCategories());
  }, [dispatch, status]);

  return (
    <section className={`container ${styles.section}`}>
      <SectionHeader
        title="Categories"
        linkText="All categories"
        linkTo="/categories"
      />
      {status === 'succeeded' ? (
        <ul className={styles.list}>
          {list.slice(0, 4).map((category) => (
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

export default CategoriesPreview;
