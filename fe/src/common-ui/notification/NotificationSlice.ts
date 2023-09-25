import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let notificationId = 1

export type NotificationPayload = {
  message: string
  type?: 'error' | 'success'
}

type NotificationType = NotificationPayload & {
  id: number
}

type initialStateType = {
  data: NotificationType[]
}

const initialState: initialStateType = {
  data: [],
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationPayload>) => {
      const nId = notificationId

      state.data.push({ ...action.payload, id: nId })

      // NOTE: remove notification after 5 sec
      const removeNotificationTime = 5000
      setTimeout(() => {
        console.log(nId, 'remove')

        state.data = state.data.filter(({ id }) => nId !== id)
      }, removeNotificationTime)

      notificationId++
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      console.log(action.payload, 'filter')

      state.data = state.data.filter(({ id }) => id !== action.payload)
    },
  },
})

export const { addNotification } = notificationSlice.actions

export default notificationSlice.reducer

// {
//   "email": [
//       "user with this E-mail already exists."
//   ]
// }
