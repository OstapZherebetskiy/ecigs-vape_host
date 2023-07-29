import { ReactNode, InputHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'

import styles from './TextField.module.scss'

type Props = {
  prevElement?: ReactNode
  withLabel?: boolean
  afterElement?: ReactNode
  containerClass?: string
  label?: string
  showError?: boolean
  classes?: { input?: string; wrapper?: string }
} & InputHTMLAttributes<HTMLInputElement>

type Ref = HTMLInputElement

export const TextField = forwardRef<Ref, Props>(
  (
    { required, placeholder, containerClass, value, label, classes, showError, withLabel = true, ...props },
    ref,
  ) => {
    const updatedPlaceholder = required ? `${placeholder}*` : placeholder

    return (
      <div className={cn(styles.wrapper, classes?.wrapper, { [styles.errorWr]: showError }, containerClass)}>
        <div className={styles.wrapperInput}>
          <input
            {...props}
            ref={ref}
            value={value}
            className={cn(styles.input, classes?.input)}
            placeholder={updatedPlaceholder}
          />
          {withLabel && <span className={cn(styles.label)}>{label ? label : updatedPlaceholder}</span>}
        </div>
        {showError && <span className={styles.error}>Invalid value</span>}
      </div>
    )
  },
)
