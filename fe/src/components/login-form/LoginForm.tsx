import { TextField } from '@/common-ui/text-field/TextField'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '@/common-ui/button'

import eye_close from '@/img/eye_close.png'
import eye_open from '@/img/eye_open.png'

import style from './LoginForm.module.scss'

enum InputType {
  login = 'Login',
  password = 'Password',
}

export const LoginForm = () => {
  const [isShowPass, setIsShowPass] = useState(false)
  const [values, setValues] = useState({
    login: '',
    password: '',
  })

  const handleShowPass = () => {
    setIsShowPass(!isShowPass)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(values)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setValues({ ...values, [name]: value })
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <TextField
        type="text"
        placeholder={InputType.login}
        name={InputType.login}
        onChange={handleChange}
      />
      <div className={style.pass__box}>
        <TextField
          type={isShowPass ? 'text' : 'password'}
          placeholder={InputType.password}
          onChange={handleChange}
          name={InputType.password}
        />
        <img
          className={style.pass_btn}
          onClick={handleShowPass}
          src={isShowPass ? eye_close : eye_open}
          alt={isShowPass ? 'show' : 'hide'}
        />
      </div>

      <Button>Увійти</Button>
    </form>
  )
}
