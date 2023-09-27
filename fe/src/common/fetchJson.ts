import { SessionStorage } from './constants'

const headers = new Headers({
  accept: 'application/json',
  'Content-Type': 'application/json',
})

export const fetchJson = async (input: RequestInfo, init: RequestInit = {}) => {
  if (!init.headers) init.headers = headers

  const tokens = sessionStorage.getItem(SessionStorage.tokens)

  if (tokens) {
    const { access } = JSON.parse(tokens)
    init.headers = { ...init.headers, Authorization: `Bearer ${access}` }
  }

  let resp = await fetch(input, init)

  if (resp.status === 400) {
    throw Error(resp.statusText)
  }

  if (resp.status === 401 && tokens) {
    const { refresh } = JSON.parse(tokens)

    const respToken = await fetch('/token/refresh', {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${refresh}` },
      method: 'POST',
      body: JSON.stringify({ refresh }),
    })

    if (respToken.status === 401) {
      throw Error(respToken.statusText)
    }
    const dataToken = await respToken.json()

    if (dataToken.detail) {
      throw Error(dataToken.detail)
    }

    sessionStorage.setItem(SessionStorage.tokens, JSON.stringify(dataToken))

    resp = await fetch(input, {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${dataToken.access}` },
    })
  }

  if (resp.status === 400) {
    throw Error(resp.statusText)
  }

  const data = await resp.json()
  return data
}
