import { validateLoginForm } from '@/common/validate'
import { ChangeEvent, FormEvent, useState } from 'react'
import { InputType, defErrorBody, defErrorValues, defValues } from './utils'
import { useActions } from '@/hooks/reduxHook'
import { useNavigate } from 'react-router'

export const useLoginForm = () => {
  const navigateTo = useNavigate()
  const { createNewAccount, loginIntoAccount } = useActions()
  const [isNewUser, setIsNewUser] = useState(false)
  const [isShowPass, setIsShowPass] = useState({
    [InputType.passwordFirst]: false,
    [InputType.passwordSecond]: false,
  })

  const [values, setValues] = useState({ ...defValues })
  const [errors, setErrors] = useState({ ...defErrorValues })

  const handleShowPass = (name: InputType.passwordFirst | InputType.passwordSecond) => {
    setIsShowPass({ ...isShowPass, [name]: !isShowPass[name] })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()

    if (isNewUser) {
      const validForm = validateLoginForm(values)
      setErrors(validForm.errors)

      if (validForm.isValid && values[InputType.older18]) {

        createNewAccount({ values, setIsNewUser, setValues })
      }

      return
    }

    const loginDataValid = { ...errors }
    let isValid = true

    if (!values[InputType.login]) {
      loginDataValid[InputType.login] = {
        isInvalid: true,
        message: 'Небхідно вказати електронну пошту',
      }
      isValid = isValid && false
    } else {
      loginDataValid[InputType.login] = defErrorBody
      isValid = isValid && true
    }

    if (!values[InputType.passwordFirst] && isValid) {
      loginDataValid[InputType.passwordFirst] = {
        isInvalid: true,
        message: 'Небхідно вказати пароль',
      }
      isValid = isValid && false
    } else {
      loginDataValid[InputType.passwordFirst] = defErrorBody
      isValid = isValid && true
    }

    setErrors(loginDataValid)

    if (isValid) {
      loginIntoAccount({ values, navigateTo })
    }
  }

  const handlerNewUser = () => {
    if (!isNewUser) {
      setErrors({ ...defErrorValues })
      setValues({ ...defValues })
    }

    setIsNewUser(!isNewUser)
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
    values,
    setValues,
    errors,
    handlerNewUser,
  }
}
