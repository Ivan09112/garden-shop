import styles from './StatusMessage.module.css';

// Сообщение о загрузке / ошибке / пустом списке
function StatusMessage({ status, error, emptyText }) {
  if (status === 'loading') {
    return (
      <div className={styles.wrapper}>
        <span className={styles.spinner} aria-label="Loading" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <p className={`${styles.wrapper} ${styles.error}`}>
        Failed to load data: {error}. Check that the backend is running on port
        3333.
      </p>
    );
  }

  if (emptyText) {
    return <p className={styles.wrapper}>{emptyText}</p>;
  }

  return null;
}

export default StatusMessage;
