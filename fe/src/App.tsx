import ErrorBoundary from '@/common-ui/errorBoundary'
import { ItemsGrid } from './components/items-grid'

function App() {
  return (
    <ErrorBoundary>
      <ItemsGrid />
    </ErrorBoundary>
  )
}

export default App
