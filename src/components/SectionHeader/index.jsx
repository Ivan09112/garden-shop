import { Link } from 'react-router-dom';
import styles from './SectionHeader.module.css';

// Заголовок секции: название + линия + кнопка-ссылка справа
function SectionHeader({ title, linkText, linkTo }) {
  return (
    <div className={styles.header}>
      <h2 className="title-h1">{title}</h2>
      <span className={styles.line} />
      <Link to={linkTo} className={styles.button}>
        {linkText}
      </Link>
    </div>
  );
}

export default SectionHeader;
