import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCartItems } from '../../store/slices/cartSlice';
import SectionHeader from '../../components/SectionHeader';
import CartList from '../../components/CartList';
import OrderForm from '../../components/OrderForm';
import OrderModal from '../../components/OrderModal';
import EmptyCart from '../../components/EmptyCart';
import styles from './CartPage.module.css';

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const [ordered, setOrdered] = useState(false);

  // после закрытия поп-апа очищаем корзину
  const handleCloseModal = useCallback(() => {
    setOrdered(false);
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <section className={`container ${styles.page}`}>
      <SectionHeader
        title="Shopping cart"
        linkText="Back to the store"
        linkTo="/products"
      />

      {items.length ? (
        <div className={styles.content}>
          <CartList items={items} />
          <OrderForm ordered={ordered} onSuccess={() => setOrdered(true)} />
        </div>
      ) : (
        <EmptyCart />
      )}

      {ordered && <OrderModal onClose={handleCloseModal} />}
    </section>
  );
}

export default CartPage;
