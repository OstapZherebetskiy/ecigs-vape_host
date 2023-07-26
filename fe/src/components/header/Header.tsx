import styles from './Header.module.scss'
import searchImg from '../img/search.png'
import accountImg from '../img/account.png'
import cartImg from '../img/cart.png'

export const Header = () => {
  return (
    <header className={styles.container}>
      <form>
        <input className={styles.input} type="text" placeholder="Я шукаю ..." />
        <img src={searchImg} className={styles.input_icon} alt="search" />
      </form>
      <div className={styles.account}>
        <img className={styles.account_icon} src={accountImg} alt="account" />
        <div className={styles.account_text}>Увійти</div>
      </div>
      <div className={styles.cart}>
        <img className={styles.cart_icon} src={cartImg} alt="cart" />
        <div className={styles.cart_text}>Кошик</div>
      </div>
    </header>
  )
}
