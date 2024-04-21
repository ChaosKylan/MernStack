import styles from './about.module.css';

import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function About() {
  return (
    <div>
      <Navbar />

      <main className={styles['wrapper']}>
        <h1 className={styles['heading']}>About us!</h1>

        <p className={styles['subtitle']}>
          Welcome to our about us page! Here, you can learn more about our team,
          our mission, and how we aim to enhance your shopping experience
          through our innovative app.
        </p>

        <div className={styles['cta-container']}>
          <Link className={styles['primary-cta']} to="/register">
            Get started
          </Link>
        </div>
      </main>
    </div>
  );
}

export default About;
