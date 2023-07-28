import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import { Loader } from '@/common-ui/loader/Loader'

import style from './Button.module.scss'

type Props = {
  children: JSX.Element | JSX.Element[] | string
  isSilver?: boolean
  isLoading?: boolean
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, isSilver, className, isLoading, ...props }: Props) => (
  <button
    className={cn(
      style.btn,
      {
        [style.silver]: isSilver,
        [style.disabled]: props.disabled || isLoading,
      },
      className,
    )}
    {...props}
    disabled={props.disabled || isLoading}
  >
    {children}
    {isLoading && (
      <div className={style.loading}>
        <Loader />
      </div>
    )}
  </button>
)
