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
      const { removeNotification } = notificationSlice.actions

      state.data.push({ ...action.payload, id: notificationId })

      // NOTE: remove notification after 5 sec
      const removeNotificationTime = 5000
      setTimeout(() => {
        console.log(notificationId)

        removeNotification(notificationId)
      }, removeNotificationTime)

      notificationId++
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(({ id }) => id !== action.payload)
    },
  },
})

export const { addNotification } = notificationSlice.actions

export default notificationSlice.reducer
