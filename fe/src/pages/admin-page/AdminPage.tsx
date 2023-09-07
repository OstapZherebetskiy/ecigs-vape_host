import style from './AdminPage.module.scss'
import cart from '../../img/cart-light.png'
import price from '../../img/price.png'
import message from '../../img/message.png'
import customers from '../../img/customers.png'

export const AdminPage = () => {
  return (
    <section className={style.container}>
      <div className={style.box}>
        <div className={style.sideBar}>
          <div className={style.sideBar_item}>
            <div className={style.orders_img_box}><img className={style.img} src={cart} alt="cart" /></div>
            <div className={style.orders_title}>Замовлення</div>
          </div>
          <div className={style.sideBar_item}>
            <div className={style.goods_img_box}><img className={style.img} src={price} alt="price" /></div>
            <div className={style.goods_title}>Товари та послуги</div>
          </div>
          <div className={style.sideBar_item}>
            <div className={style.reviews_img_box}><img className={style.img} src={message} alt="message" /></div>
            <div className={style.reviews_title}>Відгуки</div>
          </div>
          <div className={style.sideBar_item}>
            <div className={style.customers_img_box}><img className={style.img} src={customers} alt="customers" /></div>
            <div className={style.customers_title}>Клієнти</div>
          </div>
        </div>
        <div className={style.tabs}>
          <div className={style.tabs_titles}>
            <div className={style.tabs_titles_all}>Всі</div>
            <div className={style.tabs_titles_new}>Нові</div>
            <div className={style.tabs_titles_accepted}>Прийняті</div>
            <div className={style.tabs_titles_canceled}>Скасовані</div>
            <div className={style.tabs_titles_complited}>Виконані</div>
          </div>
          <div className={style.tab_active}></div>
        </div>
      </div>
    </section>
  )
}
