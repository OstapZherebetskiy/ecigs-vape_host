import { useState } from 'react'
import { Menu } from '@/components/menu/Menu'
import { EMAIL, PHONE_NUM, TELEGRAM } from '@/common/constants'

import searchImg from '@/img/search.png'
import accountImg from '@/img/account.png'
import cartImg from '@/img/cart.png'
import menuIMG from '@/img/menu.png'
import NPIMG from '@/img/NP.png'
import UPIMG from '@/img/UP.png'
import MeestIMG from '@/img/Meest.png'
import LocationIMG from '@/img/location.png'

import styles from './Header.module.scss'

export const Header = () => {
  const [isMenu, setIsMenu] = useState(false)

  const handlerClick = () => {
    console.log('click')
    setIsMenu(!isMenu)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.info}>
          <div className={styles.info_schedule}>
            Графік роботи
            <ul>
              <li>Пн-Пт 09:00-19:00</li>
              <li>Сб-Нд 10:00-16:00</li>
            </ul>
          </div>
          <div className={styles.info_delivery}>
            <ul>
              <li> <img className={styles.info_post_icon} src={NPIMG} alt="Nova poshta"/> Нова пошта</li>
              <li> <img className={styles.info_post_icon} src={UPIMG} alt="Ukr poshta"/>Укр пошта</li>
              <li> <img className={styles.info_post_icon} src={MeestIMG} alt="Meest"/>Meest</li>
              <li> <img className={styles.info_post_icon} src={LocationIMG} alt="Location"/>Тернопіль</li>
            </ul>
          </div>
        </div>
        <div className={styles.name_shop}>Ecigs Vape shop</div>
        <div className={styles.contacts}>
          <a href={TELEGRAM} className={styles.message}>
            Telegram
          </a>
          <a href={`mailto:${EMAIL}`} className={styles.mail}>
            Mail: {EMAIL}
          </a>
          <a href={`tel:${PHONE_NUM}`} className={styles.phone}>
            {PHONE_NUM}
          </a>
        </div>
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
        <div className={styles.menu}>
          <img className={styles.menu_icon} src={menuIMG} alt="menu" onClick={handlerClick} />
        </div>
        {isMenu && <Menu closeMenu={handlerClick} />}
      </header>
    </div>
  )
}
