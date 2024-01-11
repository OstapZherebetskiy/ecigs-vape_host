import { useState } from 'react'
import { Menu } from '@/components/menu/Menu'
import { Link } from 'react-router-dom';

import searchImg from '@/img/search.png'
import accountImg from '@/img/account.png'
import cartImg from '@/img/cart.png'
import menuIMG from '@/img/menu.png'

import styles from './Header.module.scss'
import { routes } from '@/common/routes';

export const Header = () => {
  const [isMenu, setIsMenu] = useState(false)

  const handlerClick = () => {
    console.log('click')
    setIsMenu(!isMenu)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <form>
          <input className={styles.input} type="text" placeholder="Я шукаю ..." />
          <img src={searchImg} className={styles.input_icon} alt="search" />
        </form>
        <Link to={routes.login} className={styles.account}>
          <img className={styles.account_icon} src={accountImg} alt="account" />
          <div className={styles.account_text}>Увійти</div>
        </Link>
        <div className={styles.cart}>
          <img className={styles.cart_icon} src={cartImg} alt="cart" />
          <div className={styles.cart_text}>Кошик</div>
        </div>
        <div className={styles.menu}>
          <img className={styles.menu_icon} src={menuIMG} alt="menu" onClick={handlerClick} />
        </div>
        {isMenu && <Menu closeMenu={handlerClick} />}
      </header>
    </div>
  )
}
