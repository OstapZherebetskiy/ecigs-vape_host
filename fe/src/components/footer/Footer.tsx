import { EMAIL, PHONE_NUM, TELEGRAM } from '@/common/constants'

import logoImg from '@/img/logo.png'

import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.items_box}>
        <div className={styles.items_logo}>
          <img className={styles.items_logo_img} src={logoImg} alt="logo" />
        </div>
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
      <div className={styles.info_box}>
        <p>
          Великий вибір вейп тематики: Електронні сигарети, pod системи, рідини, комплектуючі, аксесуари. Ви
          можете придбати в нашому інтернет магазині.
        </p>
        <br />
        <p>
          У нас тільки оригінальна продукція від перевірених виробників з таких країн, як: Україна, Китай,
          США.
        </p>
        <br />
        <p>Доставка здійснюється в день замовлення.</p>
        <br />
        <p>Залиште замовлення і наш менеджер зв'яжеться з вами в найкоротші терміни.</p>
      </div>
    </footer>
  )
}
