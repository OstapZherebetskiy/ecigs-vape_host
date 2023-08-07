export enum InputType {
  login = 'Електронна пошта',
  passwordFirst = 'Пароль',
  passwordSecond = 'Повтор паролю',
  older18 = 'Старший 18 років',
  firstName = 'Імʼя',
  lastName = 'Прізвище',
  phone = 'Номер телефону',
}

export const defErrorValues = {
  [InputType.login]: false,
  [InputType.passwordFirst]: false,
  [InputType.passwordSecond]: false,
  [InputType.older18]: false,

  [InputType.firstName]: false,
  [InputType.lastName]: false,
  [InputType.phone]: false,
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
