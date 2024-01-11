import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type NotificationPayload = {
  message: string
  type?: 'error' | 'success'
}

type NotificationType = NotificationPayload & {
  id: number
}

// NOTE: remove notification after 10 sec
const removeNotificationTime = 10000

export const addAndRemoveNotification = createAsyncThunk<string, NotificationPayload>(
  'notification/addNotification',
  async (values, { dispatch }) => {
    const { addNotification, removeNotification } = notificationSlice.actions

    const nId = new Date().getTime()

    dispatch(addNotification({ ...values, id: nId }))

    setTimeout(() => {
      dispatch(removeNotification(nId))
    }, removeNotificationTime)

    return 'successMessage'
  },
)

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
    addNotification: (
      state,
      action: PayloadAction<NotificationPayload | NotificationType>,
    ) => {
      const notification = { ...action.payload } as NotificationType

      if (!notification.id) {
        const nId = new Date().getTime()

        notification.id = nId
      }

      state.data.push(notification)
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(({ id }) => id !== action.payload)
    },
  },
})

export const { addNotification } = notificationSlice.actions

export default notificationSlice.reducer


