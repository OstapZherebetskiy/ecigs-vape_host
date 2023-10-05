import { useActions, useAppSelector } from '@/hooks/reduxHook'
import { useEffect } from 'react'
import { SessionStorage } from './constants'
import { Tokens } from '@/api/accounts'

export const useInit = () => {
  const { userData } = useAppSelector((state) => state.customerAccountReducer)
  const { getUserData } = useActions()

  useEffect(() => {
    checkUserAccount()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkUserAccount = () => {
    if (userData) return

    const tokens = sessionStorage.getItem(SessionStorage.tokens)
    if (!tokens) return

    const { access } = JSON.parse(tokens) as Tokens
    getUserData({ access })
  }
}
