import { fetchJson } from '@/common/fetchJson'
import { Tokens, User } from './types'
import { InputType, LoginValues } from '@/components/login-form/utils'

const registerNewUser = async (data: LoginValues): Promise<User> =>
  await fetchJson('/api/account/', {
    method: 'POST',
    body: JSON.stringify({
      email: data[InputType.login],
      password: data[InputType.passwordSecond],
      phone: data[InputType.phone],
      first_name: data[InputType.firstName],
      last_name: data[InputType.lastName],
    }),
  })

const loginUser = async (data: LoginValues): Promise<Tokens> =>
  await fetchJson('/api/token/', {
    method: 'POST',
    body: JSON.stringify({
      email: data[InputType.login],
      password: data[InputType.passwordFirst],
    }),
  })

const getUserData = async (access: string): Promise<User> =>
  await fetchJson('/api/account', {
    headers: { Authorization: 'Bearer ' + access },
  })

export const accountsApi = { registerNewUser, loginUser, getUserData }
