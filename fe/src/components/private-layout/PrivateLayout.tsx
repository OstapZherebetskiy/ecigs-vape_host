import { Tokens } from '@/api/accounts'
import { Loader } from '@/common-ui/loader/Loader'
import { SessionStorage } from '@/common/constants'
import { routes } from '@/common/routes'
import { useActions, useAppSelector } from '@/hooks/reduxHook'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

type Props = {
  isAdmin?: boolean
}

export const PrivateLayout = ({ isAdmin }: Props) => {
  const { userData, isUserLoading } = useAppSelector(
    (state) => state.customerAccountReducer,
  )

  const { addNotification, getUserData } = useActions()

  const navigateTo = useNavigate()

  useEffect(() => {
    if (!userData) {
      const tokens = sessionStorage.getItem(SessionStorage.tokens)

      if (!tokens) {
        addNotification({
          message: 'Ваша сесія закінчилася! Будь ласка, увійдіть в аккаунт!',
          type: 'error',
        })
        navigateTo(routes.login)
        console.error('No tokens for session')

        return
      }

      const { access } = JSON.parse(tokens) as Tokens

      getUserData({ access })
      return
    }

    if (!isAdmin && !userData.is_admin) {
      return
    }

    if (!userData.is_active || !userData.is_admin) {
      addNotification({
        message: 'В доступі відмовлено!',
        type: 'error',
      })
      navigateTo(routes.main)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  if (!userData || isUserLoading) return <Loader />

  return <Outlet />
}
