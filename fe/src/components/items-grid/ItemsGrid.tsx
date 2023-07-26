import { useEffect, useState } from 'react'
import style from './ItemsGrid.module.scss'
import { Product } from '@/api/product-microservice/types'
import { productsApi } from '@/api/product-microservice'

export const ItemsGrid = () => {
  const [productList, setProductList] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const data = await productsApi.getProducts()

    setProductList(data)

    
    console.log(data)
  }

  return (
    <ul className={style.container}>
      {productList.map((product) => (
        <li className={style.card}>
          <h3 className={style.title}>{product.name}</h3>
        </li>
      ))}
    </ul>
  )
}
