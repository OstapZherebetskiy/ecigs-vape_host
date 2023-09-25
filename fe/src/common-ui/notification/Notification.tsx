import { useActions, useAppSelector } from '@/hooks/reduxHook'
import cn from 'classnames'
import closeIcon from '@/img/close.png'

import style from './Notification.module.scss'

export const Notification = () => {
  const { data } = useAppSelector((state) => state.notificationReducer)
  const { removeNotification } = useActions()

  return (
    <div className={style['alert-placeholder']}>
      {data.map(({ type, message, id }) => (
        <div className={cn(style['alert-box'], style[type ?? ''])} key={id}>
          <button
            className={style['close-alert']}
            title="Hide Message"
            onClick={() => {
              removeNotification(id)
            }}
          >
            <img src={closeIcon} alt="X" />
          </button>
          {/* NOTE: for displaying html content in message */}
          <p dangerouslySetInnerHTML={{ __html: message }} />
        </div>
      ))}
    </div>
  )
}
