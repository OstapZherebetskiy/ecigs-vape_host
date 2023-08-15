import { Layout } from '@/components/layout'
import { ItemsGrid } from '@/components/items-grid'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/pages/login-page'
import { routes } from './common/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />

        <Route path={routes.main} element={<Layout />}>
          <Route path={routes.main} element={<ItemsGrid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
