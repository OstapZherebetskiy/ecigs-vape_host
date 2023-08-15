import ErrorBoundary from '@/common-ui/errorBoundary'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { Outlet } from 'react-router'

import style from './Layout.module.scss'

export const Layout = () => {
  return (
    <ErrorBoundary>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
