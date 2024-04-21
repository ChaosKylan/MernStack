import styles from './navbar.module.css';

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className={styles['header']}>
      <nav className={styles['navbar']}>
        <div className={styles['links-container']}>
          <Link to="/">Homepage</Link>
          <Link to="/about-us">About Us</Link>
        </div>

        <div className={styles['links-container']}>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
