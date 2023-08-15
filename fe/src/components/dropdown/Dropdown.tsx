import styles from './Dropdown.module.scss'

export const Dropdown = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li className={styles.dropdown_list}>Мій кабінет</li>
        <li className={styles.dropdown_list}>Список замовлень</li>
        <li className={styles.dropdown_list}>Вийти</li>
      </ul>
      <div className={styles.close}></div>
    </div>
  )
}
