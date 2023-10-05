import { fetchJson } from '@/common/fetchJson'
import { Product } from './types'

const getProducts = async (): Promise<Product[]> =>
  (await fetchJson('/api/goods')) as Product[]

export const productsApi = { getProducts }
