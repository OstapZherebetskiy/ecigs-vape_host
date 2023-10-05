import { accountsApi } from '@/api/accounts'
import {
  addAndRemoveNotification,
  notificationSlice,
} from '@/common-ui/notification/NotificationSlice'
import { InputType, LoginValues, defValues } from '@/components/login-form/utils'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Tokens, User } from '@/api/accounts/types'
import { SessionStorage } from '@/common/constants'
import { routes } from '@/common/routes'
import { NavigateFunction } from 'react-router'

const successMessage = 'Ваш аккаунт успішно створений!'

export const createNewAccount = createAsyncThunk<
  string,
  {
    values: LoginValues
    setValues: (value: LoginValues) => void
    setIsNewUser: (value: boolean) => void
  },
  { rejectValue: string }
>(
  'customerAccountSlice/createNewAccount',
  async ({ setValues, values, setIsNewUser }, { rejectWithValue, dispatch }) => {
    try {
      const data = await accountsApi.registerNewUser(values)

      if (!data.is_active) {
        const message = (Object.values(data)[0] as string) || 'Щось пішло не так :('

        dispatch(addAndRemoveNotification({ message, type: 'error' }))

        return rejectWithValue(message)
      }

      setIsNewUser(false)
      setValues({
        ...defValues,
        [InputType.passwordFirst]: values[InputType.passwordFirst],
        [InputType.login]: values[InputType.login],
      })

      dispatch(addAndRemoveNotification({ message: successMessage, type: 'success' }))

      return successMessage
    } catch (e) {
      const { message } = e as Error

      console.error('Can`t register new user: ' + message)

      dispatch(addAndRemoveNotification({ message, type: 'error' }))

      return rejectWithValue(message)
    }
  },
)

export const loginIntoAccount = createAsyncThunk<
  Tokens,
  { values: LoginValues; navigateTo: NavigateFunction },
  { rejectValue: string }
>(
  'customerAccountSlice/loginIntoAccount',
  async ({ values, navigateTo }, { rejectWithValue, dispatch }) => {
    try {
      const data = await accountsApi.loginUser(values)

      if (data.detail) {
        throw new Error(data.detail)
      }

      sessionStorage.setItem(SessionStorage.tokens, JSON.stringify(data))

      navigateTo(routes.main)

      dispatch(getUserData({ access: data.access }))

      return data
    } catch (e) {
      const { message } = e as Error

      console.error('Can`t log in new user: ' + message)

      dispatch(addAndRemoveNotification({ message, type: 'error' }))

      return rejectWithValue(message)
    }
  },
)

export const getUserData = createAsyncThunk<
  User,
  { access: string },
  { rejectValue: string }
>(
  'customerAccountSlice/getUserData',
  async ({ access }, { rejectWithValue, dispatch }) => {
    const { addNotification } = notificationSlice.actions

    try {
      const data = await accountsApi.getUserData(access)

      return data
    } catch (e) {
      const { message } = e as Error

      dispatch(addNotification({ message, type: 'error' }))

      return rejectWithValue(message)
    }
  },
)

type InitialStateType = {
  isLoading: boolean
  tokens: Tokens | null
  userData: User | null
  isUserLoading: boolean
}

const initialState: InitialStateType = {
  tokens: null,
  userData: null,
  isLoading: false,
  isUserLoading: false,
}

export const customerAccountSlice = createSlice({
  name: 'AccountData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewAccount.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createNewAccount.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(createNewAccount.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(loginIntoAccount.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      loginIntoAccount.fulfilled,
      (state, action: PayloadAction<Tokens>) => {
        state.tokens = action.payload
        state.isLoading = false
      },
    )
    builder.addCase(loginIntoAccount.rejected, (state) => {
      state.isLoading = false
    })

    builder.addCase(getUserData.pending, (state) => {
      state.isUserLoading = true
    })
    builder.addCase(getUserData.fulfilled, (state, action: PayloadAction<User>) => {
      state.userData = action.payload
      state.isUserLoading = false
    })
    builder.addCase(getUserData.rejected, (state) => {
      state.isUserLoading = false
    })
  },
})

export default customerAccountSlice.reducer
