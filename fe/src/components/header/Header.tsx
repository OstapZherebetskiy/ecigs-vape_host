import { useState } from 'react'
import { Menu } from '@/components/menu/Menu'
import { Dropdown } from '@/components/dropdown/Dropdown'
import { EMAIL, PHONE_NUM, TELEGRAM } from '@/common/constants'

import searchImg from '@/img/search.png'
import accountImg from '@/img/account.png'
import menuIMG from '@/img/menu.png'
import NPIMG from '@/img/NP.png'
import UPIMG from '@/img/UP.png'
import MeestIMG from '@/img/Meest.png'
import LocationIMG from '@/img/location.png'
import phoneIMG from '@/img/phone.png'

import styles from './Header.module.scss'

export const Header = () => {
  const [isHamburger, setIsHamburger] = useState(false)

  const handlerClick = () => {
    console.log('click hamburger')
    setIsHamburger(!isHamburger)
  }
  const [isDropdown, setIsDropdown] = useState(false)

  const toggleDropdown = () => {
    console.log('click dropdown')
    setIsDropdown(!isDropdown)
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
              <li>
                {' '}
                <img className={styles.info_post_icon} src={NPIMG} alt="Nova poshta" /> Нова пошта
              </li>
              <li>
                {' '}
                <img className={styles.info_post_icon} src={UPIMG} alt="Ukr poshta" />
                Укр пошта
              </li>
              <li>
                {' '}
                <img className={styles.info_post_icon} src={MeestIMG} alt="Meest" />
                Meest
              </li>
              <li>
                {' '}
                <img className={styles.info_post_icon} src={LocationIMG} alt="Location" />
                Тернопіль
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.logo}>Logo</div>
        <div className={styles.contacts}>
          <a href={TELEGRAM} target="_blank" className={styles.message}>
            Telegram: @ecigs_vape
          </a>
          <a href={`mailto:${EMAIL}`} className={styles.mail}>
            Mail: {EMAIL}
          </a>
          <div className={styles.phone}>
            <img src={phoneIMG} alt="phone" className={styles.phone_icon} />
            <a href={`tel:${PHONE_NUM}`} className={styles.phone_num}>
              {PHONE_NUM}
            </a>
          </div>
        </div>
        <form>
          <input className={styles.input} type="text" placeholder="Я шукаю ..." />
          <img src={searchImg} className={styles.input_icon} alt="search" />
        </form>
        <div className={styles.account} onClick={toggleDropdown}>
          <img className={styles.account_icon} src={accountImg} alt="account" />
          <div className={styles.account_text}>Привіт, Ім'я</div>
          {isDropdown && <Dropdown/>}
        </div>
        <div className={styles.menu}>
          <img className={styles.menu_icon} src={menuIMG} alt="menu" onClick={handlerClick} />
        </div>
        {isHamburger && <Menu closeMenu={handlerClick} />}
      </header>
    </div>
  )
}
