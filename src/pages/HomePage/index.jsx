import HeroBanner from '../../components/HeroBanner';
import CategoriesPreview from '../../components/CategoriesPreview';
import DiscountForm from '../../components/DiscountForm';
import SalePreview from '../../components/SalePreview';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.page}>
      <HeroBanner />
      <CategoriesPreview />
      <DiscountForm />
      <SalePreview />
    </div>
  );
}

export default HomePage;
