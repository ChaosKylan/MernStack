import styles from './home.module.css';

import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function Home() {
  return (
    <div>
      <Navbar />

      <main className={styles['wrapper']}>
        <h1 className={styles['heading']}>
          Welcome to our Shopping List Manager!
        </h1>

        <p className={styles['subtitle']}>
          Welcome to our shopping list app! Here, you can easily create and edit
          your shopping lists to streamline your grocery shopping experience.
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

export default Home;
