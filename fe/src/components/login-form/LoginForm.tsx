import { TextField } from '@/common-ui/text-field/TextField'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '@/common-ui/button'
import cn from 'classnames'

import eye_close from '@/img/eye_close.png'
import eye_open from '@/img/eye_open.png'

import style from './LoginForm.module.scss'

enum InputType {
  login = 'Логін',
  passwordFirst = 'Пароль',
  passwordSecond = 'Повтор паролю',
}

export const LoginForm = () => {
  const [isNewUser, setIsNewUser] = useState(false)
  const [isShowPass, setIsShowPass] = useState({
    [InputType.passwordFirst]: false,
    [InputType.passwordSecond]: false,
  })

  const [values, setValues] = useState({
    [InputType.login]: '',
    [InputType.passwordFirst]: '',
    [InputType.passwordSecond]: '',
  })

  const handleShowPass = (name: InputType.passwordFirst | InputType.passwordSecond) => {
    setIsShowPass({ ...isShowPass, [name]: !isShowPass[name] })
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
          type={isShowPass[InputType.passwordFirst] ? 'text' : 'password'}
          placeholder={InputType.passwordFirst}
          onChange={handleChange}
          name={InputType.passwordFirst}
        />
        <img
          className={style.pass_btn}
          onClick={() => handleShowPass(InputType.passwordFirst)}
          src={isShowPass[InputType.passwordFirst] ? eye_close : eye_open}
          alt={isShowPass[InputType.passwordFirst] ? 'show' : 'hide'}
        />
      </div>

      <div
        className={cn(style.newUser__inputs, {
          [style.active]: isNewUser,
        })}
      >
        <div className={style.pass__box}>
          <TextField
            type={isShowPass[InputType.passwordSecond] ? 'text' : 'password'}
            placeholder={InputType.passwordSecond}
            onChange={handleChange}
            name={InputType.passwordSecond}
          />
          <img
            className={style.pass_btn}
            onClick={() => handleShowPass(InputType.passwordSecond)}
            src={isShowPass[InputType.passwordSecond] ? eye_close : eye_open}
            alt={isShowPass[InputType.passwordSecond] ? 'show' : 'hide'}
          />
        </div>
        <label className={style.newUser}>
          <input
            type="checkbox"
            name="new_user"
            checked={isNewUser}
            onClick={() => setIsNewUser(!isNewUser)}
          />
          <span>Мені більше ніж 18 років</span>
        </label>
      </div>

      <label className={style.newUser}>
        <input
          type="checkbox"
          name="new_user"
          checked={isNewUser}
          onClick={() => setIsNewUser(!isNewUser)}
        />
        <span>У мене немає акаунта</span>
      </label>

      <Button type="submit">{isNewUser ? 'Зареєструвати аккаунт' : 'Увійти'}</Button>
    </form>
  )
}
