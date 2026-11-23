import instagram from '../../assets/icons/instagram.svg';
import whatsapp from '../../assets/icons/whatsapp.svg';
import styles from './Footer.module.css';

const MAP_URL =
  'https://www.google.com/maps?q=Dubininskaya+Ulitsa,+96,+Moscow,+Russia,+115093&z=15&output=embed';

function Footer() {
  return (
    <footer className={`container ${styles.footer}`}>
      <h2 className="title-h1">Contact</h2>

      <div className={styles.content}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <p className={styles.label}>Phone</p>
          <a href="tel:+74993506604" className={styles.value}>
            +7 (499) 350-66-04
          </a>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>Socials</p>
          <div className={styles.socials}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img src={instagram} alt="" width="44" height="44" />
            </a>
            <a
              href="https://wa.me/74993506604"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <img src={whatsapp} alt="" width="44" height="44" />
            </a>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>Address</p>
          <p className={styles.value}>
            Dubininskaya Ulitsa, 96, Moscow, Russia, 115093
          </p>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>Working Hours</p>
          <p className={styles.value}>24 hours a day</p>
        </div>
      </div>

      <iframe
        className={styles.map}
        title="Shop on the map"
        src={MAP_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      </div>
    </footer>
  );
}

export default Footer;
