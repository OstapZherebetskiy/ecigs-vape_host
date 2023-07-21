import { useEffect } from 'react'
import { fetchJson } from './api'

function App() {
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetchJson('http://localhost:8000/api/goods/category/')
    console.log(data)
  }

  return <div>lalala</div>
}

export default App
