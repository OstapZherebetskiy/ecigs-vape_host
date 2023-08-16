
import styles from './Dropdown.module.scss'
import { Link } from 'react-router-dom'

import { routes } from '@/common/routes'

export const Dropdown = () => {

  return (
    <div className={styles.container}>
      <ul>
        <li className={styles.dropdown_list}>Мій кабінет</li>
        <li className={styles.dropdown_list}>Список замовлень</li>
        <Link to={routes.login}>
          <li className={styles.dropdown_list}>
            Вийти
          </li>
        </Link>
      </ul>
      <div className={styles.close}></div>
    </div>
  )
}
