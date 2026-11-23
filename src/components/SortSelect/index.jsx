import { useEffect, useRef, useState } from 'react';
import { SORT_OPTIONS } from '../../utils';
import styles from './SortSelect.module.css';

// Выпадающий список сортировки (кастомный, как в макете)
function SortSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORT_OPTIONS.find((option) => option.value === value);

  // закрытие по клику вне списка
  useEffect(() => {
    if (!open) return;
    const handleClick = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div className={styles.select} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.open : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current.label}</span>
        <svg
          className={styles.arrow}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M4 7.5L10 13L16 7.5"
            stroke="#282828"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className={styles.list} role="listbox">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`${styles.option} ${
                  option.value === value ? styles.selected : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortSelect;
