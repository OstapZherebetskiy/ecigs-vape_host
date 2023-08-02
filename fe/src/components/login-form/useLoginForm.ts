import { ChangeEvent, FormEvent, useState } from 'react'

export enum InputType {
  login = 'Пошта',
  passwordFirst = 'Пароль',
  passwordSecond = 'Повтор паролю',
  older18 = 'Старший 18 років',
}

export const useLoginForm = () => {
  const [isNewUser, setIsNewUser] = useState(false)
  const [isShowPass, setIsShowPass] = useState({
    [InputType.passwordFirst]: false,
    [InputType.passwordSecond]: false,
  })

  const [values, setValues] = useState({
    [InputType.login]: '',
    [InputType.passwordFirst]: '',
    [InputType.passwordSecond]: '',
    [InputType.older18]: false,
  })

  const [errors, setErrors] = useState({
    [InputType.login]: false,
    [InputType.passwordFirst]: false,
    [InputType.passwordSecond]: false,
  })

  const validate = (str: string, length: number = 8) => {
    const trimed = str.trim()

    if (!trimed) return false

    if (trimed.length < length) return false

    return true
  }

  const handleShowPass = (name: InputType.passwordFirst | InputType.passwordSecond) => {
    setIsShowPass({ ...isShowPass, [name]: !isShowPass[name] })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({
      [InputType.login]: validate(values[InputType.login], 4),
      [InputType.passwordFirst]: validate(values[InputType.passwordFirst]),
      [InputType.passwordSecond]: validate(values[InputType.passwordSecond]),
    })

    console.log(errors)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    setValues({ ...values, [name]: value })
  }

  return {
    handleChange,
    handleShowPass,
    handleSubmit,
    isNewUser,
    isShowPass,
    setIsNewUser,
    values,
    setValues,
    errors,
  }
}
