import productData from './productData.json'
import { Product } from './types'

const getProducts = async (): Promise<Product[]> => productData as Product[]

export const productsApi = { getProducts }
