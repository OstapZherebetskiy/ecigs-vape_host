import { LoginForm } from '@/components/login-form'

import style from './LoginPage.module.scss'

export const LoginPage = () => {
  return (
    <section className={style.container}>
      <div className={style.box}>
        <LoginForm />
      </div>
    </section>
  )
}
