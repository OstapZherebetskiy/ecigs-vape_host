import { useEffect } from 'react'
import { fetchJson } from '@/common/fetchJson'
import { Layout } from './components/layout'

function App() {
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetchJson('http://localhost:8000/api/goods/category/')
    console.log(data)
  }

  return (
    <Layout>
      <>fs</>
    </Layout>
  )
}

export default App
