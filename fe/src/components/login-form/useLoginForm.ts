import { validateLoginForm } from '@/common/validate'
import { ChangeEvent, FormEvent, useState } from 'react'
import { InputType, defErrorBody, defErrorValues, defValues } from './utils'
import { accountsApi } from '@/api/accounts'
import { SessionStorage } from '@/common/constants'
import { useActions } from '@/hooks/reduxHook'

export const useLoginForm = () => {
  const { createNewAccount } = useActions()
  const [isNewUser, setIsNewUser] = useState(false)
  const [isShowPass, setIsShowPass] = useState({
    [InputType.passwordFirst]: false,
    [InputType.passwordSecond]: false,
  })

  const [values, setValues] = useState(defValues)
  const [errors, setErrors] = useState(defErrorValues)

  const handleShowPass = (name: InputType.passwordFirst | InputType.passwordSecond) => {
    setIsShowPass({ ...isShowPass, [name]: !isShowPass[name] })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()

    if (isNewUser) {
      const validForm = validateLoginForm(values)
      console.log(validForm)
      setErrors(validForm.errors)

      if (validForm.isValid && values[InputType.older18]) {
        console.log('register')

        createNewAccount({ values, setIsNewUser, setValues })
        // try {
        //   const data = await accountsApi.registerNewUser(values)

        //   console.log(data)

        //   setIsNewUser(false)
        //   setValues({
        //     ...defValues,
        //     [InputType.passwordFirst]: values[InputType.passwordFirst],
        //     [InputType.login]: values[InputType.login],
        //   })
        // } catch (e) {
        //   const { message } = e as Error

        //   console.log(e);

        //   console.error('Can`t register new user: ' + message)
        // }
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
      isValid = false
    } else {
      loginDataValid[InputType.login] = defErrorBody
      isValid = true
    }

    if (!values[InputType.passwordFirst] && isValid) {
      loginDataValid[InputType.passwordFirst] = {
        isInvalid: true,
        message: 'Небхідно вказати пароль',
      }
      isValid = false
    } else {
      loginDataValid[InputType.passwordFirst] = defErrorBody
      isValid = true
    }

    setErrors(loginDataValid)

    if (isValid) {
      console.log('login')
      try {
        const data = await accountsApi.loginUser(values)

        console.log(data)
        sessionStorage.setItem(SessionStorage.tokens, JSON.stringify(data))
      } catch (e) {
        const { message } = e as Error

        console.error('Can`t login user: ' + message)
      }
    }
  }

  const handlerNewUser = () => {
    if (isNewUser) {
      setErrors(defErrorValues)
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
