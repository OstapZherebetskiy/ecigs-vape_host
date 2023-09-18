import { combineReducers, configureStore } from '@reduxjs/toolkit'
import quotesDataReducer, { quotesDataSlice } from './slices/user/userSlice'

const rootReducer = combineReducers({
  quotesDataReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export const allActions = {
  ...quotesDataSlice.actions,

  //async action
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
