import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { api } from '../../api';
import {
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from '../../store/slices/cartSlice';
import { formRules, formatTotal } from '../../utils';
import styles from './OrderForm.module.css';

const fields = [
  { name: 'name', placeholder: 'Name', type: 'text' },
  { name: 'phone', placeholder: 'Phone number', type: 'tel' },
  { name: 'email', placeholder: 'Email', type: 'email' },
];

// Блок «Order details» -> POST /order/send
function OrderForm({ ordered, onSuccess }) {
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    try {
      await api.sendOrder({
        ...data,
        products: items.map(({ id, count }) => ({ id, count })),
        total,
      });
      reset();
      onSuccess();
    } catch {
      setError('root', { message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className={styles.order}>
      <div className={styles.summary}>
        <h2 className="title-h2">Order details</h2>
        <div>
          <p className={styles.grey}>
            {count} {count === 1 ? 'item' : 'items'}
          </p>
          <div className={styles.total}>
            <span className={styles.grey}>Total</span>
            <span className={styles.sum}>{formatTotal(total)}</span>
          </div>
        </div>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.inputs}>
          {fields.map(({ name, placeholder, type }) => (
            <div key={name} className={styles.field}>
              <input
                type={type}
                placeholder={placeholder}
                className={`${styles.input} ${
                  errors[name] ? styles.invalid : ''
                }`}
                {...register(name, formRules[name])}
              />
              {errors[name] && (
                <span className={styles.error}>{errors[name].message}</span>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={`${styles.button} ${ordered ? styles.placed : ''}`}
          disabled={ordered || isSubmitting}
        >
          {ordered ? 'The Order is Placed' : 'Order'}
        </button>
        {errors.root && (
          <span className={styles.rootError}>{errors.root.message}</span>
        )}
      </form>
    </div>
  );
}

export default OrderForm;
