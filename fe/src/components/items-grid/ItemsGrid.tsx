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
  }

  const getFormatedDesc = (desc: string) => {
    if (desc.length <= 130) return desc

    const newDesc = desc.slice(0, 130).split(' ')

    return newDesc.slice(0, newDesc.length).join(' ') + ' ...'
  }

  return (
    <ul className={style.container}>
      {productList.map((product) => (
        <li className={style.card}>
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
          <p className={style.desc}>{getFormatedDesc(product.description)}</p>
          <span className={style.price}>2000 грн</span>
          <Button className={style.btn}>Купити</Button>
        </li>
      ))}
    </ul>
  )
}
