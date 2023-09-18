import React from 'react'
import style from './AdminPageCard.module.scss'
import plus from '../../../img/plus.png'
import blank from '@/img/blank.png'
import wallet from '@/img/wallet.png'
import van from '@/img/van.png'

export const AdminPageCard = () => {
  return (
    <section className={style.container}>
      <input type="checkbox" />
      <img className={style.info_img} src={plus} alt="product" />
      <div className={style.info_order}>
        <div className={style.info_order_number}>45456754</div>
        <div className={style.info_order_period}>
          <div className={style.info_order_time}>23:22</div>,
          <div className={style.info_order_date}>12.03.2020</div>
        </div>
        <img className={style.info_order_plus} src={plus} alt="+" />
        <div className={style.info_order_name}>
          Кальян на одну трубку Elf bar RF 350 ...
        </div>
      </div>
      <div className={style.info_sum}>
        <div className={style.info_sum_price}>9999грн</div>
        <div className={style.info_sum_quantity}>54 шт.</div>
      </div>
      <div className={style.info_customer}>
        <div className={style.info_customer_name}>Єлизавета Володимирівна</div>
        <div className={style.info_customer_phone}>+380999999999</div>
      </div>
      <ul className={style.info_delivery}>
        <li className={style.info_delivery_info}>
          <img
            src={van}
            alt="Доставка"
            className={style.icon_delivery}
          />
          Доставка Нова пошта м Вінниця відділення номер 13 до 30 кг на одне місце
          двокрапка wall київська 134
        </li>
        <li className={style.info_delivery_message}>
          <img
            src={blank}
            alt="Повідомлення"
            className={style.icon_delivery}
          />
          20450744061500 отримай но крапка очікуйте СМС про надходження грошового переказу
        </li>
        <li className={style.info_delivery_payment}>
          <img
            src={wallet}
            alt="Оплата"
            className={style.icon_delivery}
          />
          Після оплати "Нова пошта"
        </li>
      </ul>
    </section>
  )
}
