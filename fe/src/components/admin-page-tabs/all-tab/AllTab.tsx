import React, { useState } from 'react';
import style from './AllTab.module.scss';

interface Option {
  value: string;
  label: string;
}

export const AllTab = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const options: Option[] = [
    { value: 'price', label: 'За ціною' },
    { value: 'date', label: 'За датою' },
  ];

  return (
    <section className={style.AllTab}>
      <div className={style.dropdown}>Відфільтруйте замовлення
        <select
          className={style.dropdown_select}
          value={selectedOption || ''}
          onChange={(e) => handleOptionChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

  );
};