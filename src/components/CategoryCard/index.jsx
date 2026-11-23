import { Link } from 'react-router-dom';
import { getImageUrl } from '../../api';
import styles from './CategoryCard.module.css';

function CategoryCard({ category }) {
  return (
    <Link to={`/categories/${category.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(category.image)}
          alt={category.title}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <h3 className={styles.title}>{category.title}</h3>
    </Link>
  );
}

export default CategoryCard;
