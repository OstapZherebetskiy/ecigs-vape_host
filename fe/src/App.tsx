import { useEffect } from 'react'
import { fetchJson } from '@/common/fetchJson'
import ErrorBoundary from '@/common-ui/errorBoundary'
import { Header } from '../src/components/header/Header'
import { Footer } from '../src/components/footer/Footer'

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
      <Header/>
      <Footer/>
    </ErrorBoundary>
  )
}

export default App
