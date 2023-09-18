import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Tokens } from './types'

export const fetchUserTokens = createAsyncThunk<
  Tokens,
  { login: string; pass: string },
  { rejectValue: string }
>('userSlice/fetchUserTokens', async ({ login, pass }, { rejectWithValue }) => {
  console.log('fetchUserTokens', login, pass)

  try {
    return {
      access: 'access',
      refresh: 'refresh',
    }
    // return rejectWithValue('error')
  } catch (error) {
    const { message } = error as Error

    console.error(message)
    return rejectWithValue(message)
  }
})

type InitialStateType = {
  tokens: Tokens | null
  isLoading: boolean
}

const initialState: InitialStateType = {
  tokens: null,
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserTokens.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchUserTokens.fulfilled, (state, action) => {
      state.tokens = action.payload
      state.isLoading = false
    })

    builder.addCase(fetchUserTokens.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export default userSlice.reducer
