import { InputType, LoginValues } from '@/components/login-form/utils'

export const validateLoginForm = (values: LoginValues) => {
  const copyVal = { ...values }

  const errors = {} as Record<InputType, boolean>

  Object.entries(copyVal).every(([k, v]) => {
    const key = k as InputType
    const value = v as string

    switch (key) {
      case InputType.login:
        if (value.length < 8) {
          errors[key] = true
        }
        break
      case InputType.passwordFirst:
        errors[key] =
          value.length >= 8 && value.length <= 16 && !!value.match(/[0-9a-z]/gi)

        // todo пароль мін 8 макс 16 буква і цифра

        break
      case InputType.passwordSecond:
        break
      case InputType.firstName:
        break
      case InputType.lastName:
        break
      case InputType.phone:
        break
    }
  })

  return {
    [InputType.login]: false,
    [InputType.passwordFirst]: false,
    [InputType.passwordSecond]: false,
    [InputType.older18]: false,

    [InputType.firstName]: false,
    [InputType.lastName]: false,
    [InputType.phone]: false,
  }
}
