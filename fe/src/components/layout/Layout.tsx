import ErrorBoundary from '@/common-ui/errorBoundary'

import style from './Layout.module.scss'

type Props = {
  children: JSX.Element
}

export const Layout = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <div>Header</div>
      <main className={style.main}>{children}</main>
      <footer>Footer</footer>
    </ErrorBoundary>
  )
}
