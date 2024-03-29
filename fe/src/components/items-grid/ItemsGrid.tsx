import { useEffect, useState } from 'react'
import { Product } from '@/api/product-microservice/types'
import { productsApi } from '@/api/product-microservice'
import { Button } from '@/common-ui/button'

import style from './ItemsGrid.module.scss'

export const ItemsGrid = () => {
  const [productList, setProductList] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const data = await productsApi.getProducts()

    setProductList(data)
  }

  const getFormattedDesc = (desc: string) => {
    if (desc.length <= 130) return desc

    const newDesc = desc.slice(0, 130).split(' ')

    return newDesc.slice(0, newDesc.length).join(' ') + ' ...'
  }

  return (
    <ul className={style.container}>
      {productList.map((product) => (
        <li key={product.id} className={style.card}>
          <div className={style.box}>
            <h3 className={style.title}>{product.name}</h3>
            <div className={style.img__box}>
              <img className={style.img} src={product.main_photo} alt={product.name} />
            </div>
          </div>
          {product.in_stock ? (
            <span className={style.present}>В наявності</span>
          ) : (
            <span className={style.absent}>Товар відсутній</span>
          )}
          <p className={style.desc}>{getFormattedDesc(product.description)}</p>
          <span className={style.price}>{product.price} грн</span>
          <Button className={style.btn}>Купити</Button>
        </li>
      ))}
    </ul>
  )
}
