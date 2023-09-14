import React, { useState } from 'react'
import style from './AllTab.module.scss'
import dropdown from '../../../img/dropdown.png'

export const AllTab = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const toggleDropdown = () => {
    setIsSelected(!isSelected)
  }

  return (
    <section className={style.AllTab}>
      <div onClick={toggleDropdown} className={style.dropdown}>
        <span className={style.dropdown_text}>Відфільтруйте замовлення</span>
        <img className={style.dropdown_icon} src={dropdown} alt="dropdown" />
      </div>
      <div className={style.dropdown_content}>
        {isSelected && (
          <div className={style.dropdown_items}>
            <div onClick={toggleDropdown} className={style.dropdown_selected}>
              За ціною
            </div>
            <div onClick={toggleDropdown} className={style.dropdown_selected}>
              За датою
            </div>
          </div>
        )}
      </div>
      {/* Comment. Do I need to do a search? */}
      <div className={style.info}>
        <input className={style.checkbox} type="checkbox" />
        <div className={style.Order}>Замовлення</div>
        <div className={style.Summ}>Загальна сума</div>
        <div className={style.Customer}>Клієнт</div>
        <div className={style.Delivery}>Доставка та оплата</div>
        <div className={style.Status}>Статус</div>
      </div>
    </section>
  )
}
