import { validateLoginForm } from '@/common/validate'
import { ChangeEvent, FormEvent, useState } from 'react'
import { InputType, defErrorValues, defValues } from './utils'

export const useLoginForm = () => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isNewUser) {
      setErrors(validateLoginForm(values))
    }

    console.log(errors)
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
