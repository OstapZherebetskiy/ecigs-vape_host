import ErrorBoundary from '@/common-ui/errorBoundary'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

import style from './Layout.module.scss'

type Props = {
  children: JSX.Element
}

export const Layout = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <Header/>
      <main className={style.main}>{children}</main>
     <Footer/>
    </ErrorBoundary>
  )
}
