import styles from './shoppingListCard.module.css';

import { Link } from 'react-router-dom';

function ShoppingListCard({ _id: id, name, items }) {
  return (
    <div className={styles['card-container']}>
      <div className={styles['card-content']}>
        <div className={styles['card-header']}>
          <h3 className={styles['card-name']}>{name}</h3>
          <Link className={styles['card-edit-btn']} to={`edit/${id}`}>
            Edit
          </Link>
        </div>
      </div>
      <hr className={styles['divider']} />

      <div className={styles['card-content']}>
        <ul className={styles['list']}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShoppingListCard;
