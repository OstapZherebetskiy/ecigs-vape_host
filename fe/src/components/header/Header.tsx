import React, { useState } from "react";
import { Menu } from "../menu/Menu";

import styles from './Header.module.scss'
import searchImg from '../img/search.png'
import accountImg from '../img/account.png'
import cartImg from '../img/cart.png'
import menuIMG from '../img/menu.png'

export const Header = () => {
  const [isMenu, setIsMenu] = useState(false);

  const handlerClick = () =>{
      console.log("click");
      setIsMenu(!isMenu) ;
  }
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
        <div className={styles.menu}>
          <img className={styles.menu_icon} src={menuIMG} alt="menu" onClick={handlerClick}/>
        </div>
        {isMenu && <Menu closeMenu={handlerClick} />}
      </header>
    </div>
  )
}
