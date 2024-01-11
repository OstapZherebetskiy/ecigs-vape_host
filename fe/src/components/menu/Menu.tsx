import styles from './Menu.module.scss'
import closeImg from '@/img/close.png'
import accountImg from '@/img/account.png'
import cartImg from '@/img/cart.png'

type Props = {
  closeMenu: () => void
}

export const Menu = ({ closeMenu }: Props) => {
   
    return (
      <div className={styles.container}>
        <div className={styles.account}>
          <img className={styles.account_icon} src={accountImg} alt="account" />
          <div className={styles.account_text}>Увійти</div>
        </div>
        <div className={styles.cart}>
          <img className={styles.cart_icon} src={cartImg} alt="cart" />
          <div className={styles.cart_text}>Кошик</div>
        </div>
        <div className={styles.close}>
          <img className={styles.close_icon} onClick={closeMenu} src={closeImg} alt="close" />
        </div>
      </div>
    )
  
}
