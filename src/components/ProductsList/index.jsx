import ProductCard from '../ProductCard';
import StatusMessage from '../StatusMessage';
import styles from './ProductsList.module.css';

function ProductsList({ products, withButton = true }) {
  if (!products.length) {
    return <StatusMessage emptyText="No products match the selected filters." />;
  }

  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} withButton={withButton} />
        </li>
      ))}
    </ul>
  );
}

export default ProductsList;
