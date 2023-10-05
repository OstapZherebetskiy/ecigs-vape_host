import { LoginForm } from '@/components/login-form'
import { useEffect } from 'react'
import { useAppSelector } from '@/hooks/reduxHook'
import { useNavigate } from 'react-router'
import { routes } from '@/common/routes'

import logo from '@/img/logo.png'

import style from './LoginPage.module.scss'

export const LoginPage = () => {
  const { userData } = useAppSelector((state) => state.customerAccountReducer)

  const navigateTo = useNavigate()

  useEffect(() => {
    if (userData) {
      navigateTo(routes.account)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

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
