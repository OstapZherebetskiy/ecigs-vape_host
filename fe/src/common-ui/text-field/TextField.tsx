import { ReactNode, InputHTMLAttributes } from 'react'
import cn from 'classnames'

import styles from './TextField.module.scss'

type Props = {
  prevElement?: ReactNode
  withLabel?: boolean
  afterElement?: ReactNode
  containerClass?: string
  label?: string
  showError?: boolean
  errorMessage?: string
  classes?: { input?: string; wrapper?: string }
} & InputHTMLAttributes<HTMLInputElement>

export const TextField = ({
  required,
  placeholder,
  containerClass,
  value,
  label,
  classes,
  showError,
  errorMessage,
  withLabel = true,
  ...props
}: Props) => {
  const updatedPlaceholder = required ? `${placeholder}*` : placeholder

  return (
    <div
      className={cn(
        styles.wrapper,
        classes?.wrapper,
        { [styles.errorWr]: showError },
        containerClass,
      )}
    >
      <div className={styles.wrapperInput}>
        <input
          {...props}
          value={value}
          className={cn(styles.input, classes?.input)}
          placeholder={updatedPlaceholder}
          required={required}
        />
        {withLabel && (
          <span className={cn(styles.label)}>{label ? label : updatedPlaceholder}</span>
        )}
      </div>
      {showError && (
        <span className={styles.error}>{errorMessage || 'Невірне значення'}</span>
      )}
    </div>
  )
}
