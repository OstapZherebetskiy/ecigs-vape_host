import { useEffect, useState } from 'react'
import { Product } from '@/api/product-microservice/types'
import { productsApi } from '@/api/product-microservice'

import style from './ItemsGrid.module.scss'
import { Button } from '@/common-ui/button'

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
          <img className={style.img} src={product.main_photo} alt={product.name} />
          {product.in_stock ? (
            <span className={style.present}>В наявності</span>
          ) : (
            <span className={style.absent}>Товар відсутній</span>
          )}
          <p className={style.desc}>{product.description}</p>
          <span className={style.price}>2000 грн</span>
          <Button className={style.btn}>Купити</Button>
        </li>
      ))}
    </ul>
  )
}
