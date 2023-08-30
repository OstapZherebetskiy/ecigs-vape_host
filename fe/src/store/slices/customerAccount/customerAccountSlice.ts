import { accountsApi } from '@/api/accounts'
import { notificationSlice } from '@/common-ui/notification/NotificationSlice'
import { InputType, LoginValues, defValues } from '@/components/login-form/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const createNewAccount = createAsyncThunk<
  string,
  {
    values: LoginValues
    setValues: (value: LoginValues) => void
    setIsNewUser: (value: boolean) => void
  },
  { rejectValue: string }
>(
  'CustomerAccountData/fetchCustomerAccountData',
  async ({ setValues, values, setIsNewUser }, { rejectWithValue, dispatch }) => {
    const { addNotification } = notificationSlice.actions

    try {
      const data = await accountsApi.registerNewUser(values)

      console.log(data, 'data')

      setIsNewUser(false)
      setValues({
        ...defValues,
        [InputType.passwordFirst]: values[InputType.passwordFirst],
        [InputType.login]: values[InputType.login],
      })

      const successMessage = 'Ваш аккаунт успішно створений!'

      dispatch(addNotification({ message: successMessage, type: 'success' }))

      return successMessage
    } catch (e) {
      const { message } = e as Error

      console.log(e)

      console.error('Can`t register new user: ' + message)

      dispatch(addNotification({ message, type: 'error' }))

      return rejectWithValue('message')
    }
  },
)

type InitialStateType = {
  data: null
  isLoading: boolean
}

const initialState: InitialStateType = {
  data: null,
  // chosenAccount: null,
  isLoading: false,
  // isError: false,
}

export const customerAccountSlice = createSlice({
  name: 'AccountData',
  initialState,
  reducers: {
    // setChosenAccount: (state, action: PayloadAction<Account>) => {
    //   // state.chosenAccount = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewAccount.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(createNewAccount.fulfilled, (state) => {
      state.data = null
      state.isLoading = false
    })

    builder.addCase(createNewAccount.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export default customerAccountSlice.reducer
