import { useEffect } from 'react'
import { fetchJson } from '@/common/fetchJson'
import ErrorBoundary from '@/common-ui/errorBoundary'
import { TextField } from './common-ui/text-field/TextField'

function App() {
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetchJson('http://localhost:8000/api/goods/category/')
    console.log(data)
  }

  return (
    <ErrorBoundary>
      <TextField />
      <div>lalala</div>
    </ErrorBoundary>
  )
}

export default App
