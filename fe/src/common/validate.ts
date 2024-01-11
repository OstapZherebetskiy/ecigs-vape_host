import {
  ErrorBody,
  InputType,
  LoginValues,
  defErrorBody,
} from '@/components/login-form/utils'

export const validateLoginForm = (values: LoginValues) => {
  const copyVal = { ...values }

  const errors = {} as Record<InputType, ErrorBody>
  let isValid = true

  Object.entries(copyVal).forEach(([k, v]) => {
    const key = k as InputType
    const value = v as string

    switch (key) {
      case InputType.login:
        if (value.trim().length <= 8) {
          errors[key] = { isInvalid: true, message: 'Мінімум 8 символів' }
          isValid = false
          break
        }
        if (value.match(/ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)) {
          errors[key] = { isInvalid: true, message: 'Введіть коректну пошту' }
          isValid = false
          break
        }

        isValid = true && isValid
        errors[key] = defErrorBody
        break

      case InputType.passwordFirst:
        if (value.length < 8 || value.length > 16) {
          errors[key] = {
            isInvalid: true,
            message: 'Пароль повинен містити від 8 до 16 символів',
          }
          isValid = false
          break
        }
        if (!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/i)) {
          errors[key] = {
            isInvalid: true,
            message: 'Пароль повинен містити букви та цифри',
          }
          isValid = false
          break
        }

        isValid = true && isValid
        errors[key] = defErrorBody
        break

      case InputType.passwordSecond:
        if (value.length <= 8 || value.length >= 16) {
          errors[key] = {
            isInvalid: true,
            message: 'Пароль повинен містити від 8 до 16 символів',
          }
          isValid = false
          break
        }
        if (!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/i)) {
          errors[key] = {
            isInvalid: true,
            message: 'Пароль повинен містити букви та цифри',
          }
          isValid = false
          break
        }
        if (copyVal[InputType.passwordFirst] !== copyVal[InputType.passwordSecond]) {
          errors[key] = {
            isInvalid: true,
            message: 'Паролі повинні співпадати',
          }
          isValid = false
          break
        }

        isValid = true && isValid
        errors[key] = defErrorBody
        break

      case InputType.older18:
        if (!value) {
          errors[key] = {
            isInvalid: true,
            message: 'Обовʼязкове поле',
          }
          isValid = false
          break
        }

        isValid = true && isValid
        errors[key] = defErrorBody
        break

      case InputType.firstName:
      case InputType.lastName:
        if (value.trim().length < 2) {
          errors[key] = {
            isInvalid: true,
            message: 'Мінімум 2 букви',
          }
          isValid = false
          break
        }

        isValid = true && isValid
        errors[key] = defErrorBody
        break

      case InputType.phone:
        if (
          value.replaceAll(' ', '').length === 11 ||
          !value.replaceAll(' ', '').match(/^\+380\d{9}$/i)
        ) {
          errors[key] = {
            isInvalid: true,
            message: 'Введіть коректний номер +380...',
          }
          isValid = false
          break
        }

        isValid = true && isValid
        errors[key] = defErrorBody
        break
    }
  })

  return { errors, isValid }
}
