import { Layout } from '@/components/layout'
import { ItemsGrid } from '@/components/items-grid'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/pages/login-page'
import { Path } from '@/common/constants'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.login} element={<LoginPage />} />

        <Route path={Path.main} element={<Layout />}>
          <Route path={Path.main} element={<ItemsGrid />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
