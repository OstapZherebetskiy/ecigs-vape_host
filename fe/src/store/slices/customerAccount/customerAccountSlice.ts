import { accountsApi } from '@/api/accounts'
import { notificationSlice } from '@/common-ui/notification/NotificationSlice'
import { InputType, LoginValues, defValues } from '@/components/login-form/utils'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Tokens, User } from '@/api/accounts/types'
import { SessionStorage } from '@/common/constants'

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
    const { addNotification } = notificationSlice.actions

    try {
      const data = await accountsApi.registerNewUser(values)

      if (!data.is_active) {
        const message = (Object.values(data)[0] as string) || 'Щось пішло не так :('

        dispatch(addNotification({ message, type: 'error' }))

        return rejectWithValue(message)
      }

      setIsNewUser(false)
      setValues({
        ...defValues,
        [InputType.passwordFirst]: values[InputType.passwordFirst],
        [InputType.login]: values[InputType.login],
      })

      dispatch(addNotification({ message: successMessage, type: 'success' }))

      return successMessage
    } catch (e) {
      const { message } = e as Error

      console.error('Can`t register new user: ' + message)

      dispatch(addNotification({ message, type: 'error' }))

      return rejectWithValue(message)
    }
  },
)

export const loginIntoAccount = createAsyncThunk<
  Tokens,
  { values: LoginValues },
  { rejectValue: string }
>(
  'customerAccountSlice/loginIntoAccount',
  async ({ values }, { rejectWithValue, dispatch }) => {
    const { addNotification } = notificationSlice.actions

    console.log(values, 'login, pass')

    try {
      const data = await accountsApi.loginUser(values)

      console.log(data)
      sessionStorage.setItem(SessionStorage.tokens, JSON.stringify(data))

      // todo redirect to home page

      dispatch(getUserData({ access: data.access }))

      return data
    } catch (e) {
      const { message } = e as Error

      console.error('Can`t log in new user: ' + message)

      dispatch(addNotification({ message, type: 'error' }))

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

    console.log(access, 'login, pass')

    try {
      const data = await accountsApi.getUserData(access)

      console.log('user', data)

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
}

const initialState: InitialStateType = {
  tokens: null,
  userData: null,
  isLoading: false,
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
  },
})

export default customerAccountSlice.reducer
