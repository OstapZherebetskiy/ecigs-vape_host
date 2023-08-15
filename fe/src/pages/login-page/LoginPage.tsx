import { LoginForm } from '@/components/login-form'

import logo from '@/img/logo.png'

import style from './LoginPage.module.scss'

export const LoginPage = () => {
  return (
    <section className={style.container}>
      <div className={style.box}>
        <div className={style.img__box}>
          <img className={style.logo} src={logo} alt="ecigs-vape logo" />
        </div>

        <LoginForm />
      </div>
    </section>
  )
}
