import cn from 'classnames'
import { SelectHTMLAttributes } from 'react'

import styles from './Select.module.scss'

type Option = {
  key: string
  value: string
}

type Props = {
  options: Option[]
  containerClass?: string
} & SelectHTMLAttributes<HTMLSelectElement>

export const Select = ({ options, placeholder, containerClass, required, ...props }: Props) => {
  const updatedPlaceholder = required ? `${placeholder} *` : placeholder

  return (
    <div className={cn(styles.wrapper, containerClass)}>
      <span className={cn(styles.label)}>{updatedPlaceholder}</span>
      <div className={styles.wrapperSelect}>
        <select className={cn(styles.select)} {...props}>
          {options.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
