import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../api';
import { formRules } from '../../utils';
import discountImage from '../../assets/images/discount.png';
import styles from './DiscountForm.module.css';

// Форма «5% off on the first order» -> POST /sale/send
function DiscountForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await api.sendSaleRequest(data);
      setSubmitted(true);
      reset();
    } catch {
      setServerError('Something went wrong. Please try again.');
    }
  };

  const fields = [
    { name: 'name', placeholder: 'Name', type: 'text' },
    { name: 'phone', placeholder: 'Phone number', type: 'tel' },
    { name: 'email', placeholder: 'Email', type: 'email' },
  ];

  return (
    <section className="container">
      <div className={styles.banner}>
        <h2 className={styles.title}>5% off on the first order</h2>

        <div className={styles.content}>
          <img src={discountImage} alt="" className={styles.image} />

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
                    disabled={submitted}
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
              className={`${styles.button} ${
                submitted ? styles.submitted : ''
              }`}
              disabled={submitted || isSubmitting}
            >
              {submitted ? 'Request Submitted' : 'Get a discount'}
            </button>
            {serverError && <span className={styles.error}>{serverError}</span>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default DiscountForm;
