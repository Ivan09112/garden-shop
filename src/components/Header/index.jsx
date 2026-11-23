import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../store/slices/cartSlice';
import logo from '../../assets/icons/logo.svg';
import basket from '../../assets/icons/basket.svg';
import styles from './Header.module.css';

const links = [
  { to: '/', label: 'Main Page' },
  { to: '/categories', label: 'Categories' },
  { to: '/products', label: 'All products' },
  { to: '/sales', label: 'All sales' },
];

function Header() {
  const count = useSelector(selectCartCount);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} aria-label="Main page">
          <img src={logo} alt="Garden shop" width="70" height="70" />
        </Link>

        <nav className={styles.nav}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Link to="/cart" className={styles.cart} aria-label="Shopping cart">
          <img src={basket} alt="" width="48" height="48" />
          {count > 0 && (
            <span className={styles.badge}>{count > 99 ? '99+' : count}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
