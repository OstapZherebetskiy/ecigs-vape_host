import { combineReducers, configureStore } from '@reduxjs/toolkit'

import customerAccountReducer, {
  createNewAccount,
  loginIntoAccount,
  customerAccountSlice,
} from './slices/customerAccount/customerAccountSlice'
import notificationReducer, {
  addAndRemoveNotification,
  notificationSlice,
} from '@/common-ui/notification/NotificationSlice'

const rootReducer = combineReducers({
  customerAccountReducer,
  notificationReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export const allActions = {
  ...customerAccountSlice.actions,
  ...notificationSlice.actions,

  //async action
  loginIntoAccount,
  createNewAccount,
  addAndRemoveNotification,
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
