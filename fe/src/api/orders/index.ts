import { fetchJson } from '@/common/fetchJson'
// import { User } from './types'
import { InputType, LoginValues } from '@/components/login-form/utils'

const registerNewUser = async (data: LoginValues): Promise<User[]> => {
  const body = {
    email: data[InputType.login],
    password: data[InputType.passwordSecond],
    phone: data[InputType.phone],
    first_name: data[InputType.firstName],
    last_name: data[InputType.lastName],
  }

  // return await fetchJson('/account', {
  return await fetchJson('/api/account/', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export const accountsApi = { registerNewUser }
