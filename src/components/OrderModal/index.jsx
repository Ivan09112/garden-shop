import { useEffect } from 'react';
import styles from './OrderModal.module.css';

// Поп-ап «Congratulations!» после оформления заказа
function OrderModal({ onClose }) {
  useEffect(() => {
    const handleKey = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.text}>
          <h2 className={styles.title}>Congratulations!</h2>
          <p className={styles.message}>
            Your order has been successfully placed on the website.
            <br />A manager will contact you shortly to confirm your order.
          </p>
        </div>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path
              d="M33 11L11 33M11 11L33 33"
              stroke="white"
              strokeWidth="3.67"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default OrderModal;
