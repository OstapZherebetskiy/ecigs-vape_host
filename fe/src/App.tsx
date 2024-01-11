import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ItemsGrid } from '@/components/items-grid'
import { LoginPage } from '@/pages/login-page'
import { AdminPage } from '@/pages/admin-page'
import { routes } from '@/common/routes'
import { AllTab } from '@/components/admin-page-tabs/all-tab/AllTab'
import { Notification } from '@/common-ui/notification'
import { PrivateLayout } from '@/components/private-layout'
import { useInit } from '@/common/useInit'

function App() {
  useInit()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.main} element={<Layout />}>
            <Route path={routes.main} element={<ItemsGrid />} />
          </Route>

          <Route path={routes.layout} element={<PrivateLayout isAdmin />}>
            <Route path={routes.admin} element={<AdminPage />}>
              <Route path={routes.all} element={<AllTab />} />

              <Route path={routes._Empty} element={<Navigate to={routes.all} />} />
              <Route path={routes._All} element={<Navigate to={routes.all} />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <Notification />
    </>
  )
}

export default App
