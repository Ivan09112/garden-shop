import styles from './QuantityCounter.module.css';

// Счётчик количества: [-] 1 [+]
function QuantityCounter({ value, onDecrement, onIncrement, min = 1 }) {
  return (
    <div className={styles.counter}>
      <button
        type="button"
        className={styles.button}
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <span className={styles.value}>{value}</span>
      <button
        type="button"
        className={styles.button}
        onClick={onIncrement}
        aria-label="Increase quantity"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default QuantityCounter;
