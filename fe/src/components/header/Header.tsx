import styles from './Header.module.scss'
import searchImg from '../img/search.png'
import accountImg from '../img/account.png'
import cartImg from '../img/cart.png'
import menuIMG from '../img/menu.png'

export const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
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
        <div className={styles.menu_mobile}>
          <img className={styles.menu_icon_mobile} src={menuIMG} alt="menu" />
        </div>
      </header>
    </div>
  )
}
