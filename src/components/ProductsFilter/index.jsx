import SortSelect from '../SortSelect';
import styles from './ProductsFilter.module.css';

// Панель фильтров: цена от/до, только со скидкой, сортировка
function ProductsFilter({ filters, onChange, showDiscount = true }) {
  const handlePrice = (event) => {
    const { name, value } = event.target;
    if (value === '' || Number(value) >= 0) onChange(name, value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.group}>
        <span className={styles.label}>Price</span>
        <input
          type="number"
          name="from"
          min="0"
          placeholder="from"
          className={styles.input}
          value={filters.from}
          onChange={handlePrice}
        />
        <input
          type="number"
          name="to"
          min="0"
          placeholder="to"
          className={styles.input}
          value={filters.to}
          onChange={handlePrice}
        />
      </div>

      {showDiscount && (
        <label className={styles.group}>
          <span className={styles.label}>Discounted items</span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={filters.onlyDiscount}
            onChange={(event) => onChange('onlyDiscount', event.target.checked)}
          />
          <span className={styles.checkbox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </label>
      )}

      <div className={styles.group}>
        <span className={styles.label}>Sorted</span>
        <SortSelect
          value={filters.sort}
          onChange={(value) => onChange('sort', value)}
        />
      </div>
    </div>
  );
}

export default ProductsFilter;
