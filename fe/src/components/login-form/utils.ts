export enum InputType {
  login = 'Електронна пошта',
  passwordFirst = 'Пароль',
  passwordSecond = 'Повтор паролю',
  older18 = 'Старший 18 років',
  firstName = 'Імʼя',
  lastName = 'Прізвище',
  phone = 'Номер телефону',
}

export const defErrorBody: ErrorBody = {
  isInvalid: false,
  message: '',
}

export const defErrorValues: Record<InputType, ErrorBody> = {
  [InputType.login]: defErrorBody,
  [InputType.passwordFirst]: defErrorBody,
  [InputType.passwordSecond]: defErrorBody,
  [InputType.older18]: defErrorBody,

  [InputType.firstName]: defErrorBody,
  [InputType.lastName]: defErrorBody,
  [InputType.phone]: defErrorBody,
}

export const defValues: LoginValues = {
  [InputType.login]: '',
  [InputType.passwordFirst]: '',
  [InputType.passwordSecond]: '',
  [InputType.older18]: false,

  [InputType.firstName]: '',
  [InputType.lastName]: '',
  [InputType.phone]: '',
}

export type LoginValues = {
  [InputType.login]: string
  [InputType.passwordFirst]: string
  [InputType.passwordSecond]: string
  [InputType.older18]: boolean

  [InputType.firstName]: string
  [InputType.lastName]: string
  [InputType.phone]: string
}

export type ErrorBody = {
  isInvalid: boolean
  message: string
}
