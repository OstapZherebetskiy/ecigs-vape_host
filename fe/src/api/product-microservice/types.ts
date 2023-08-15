export type Product = {
  id: number
  name: string
  price: string
  description: string
  in_stock: boolean
  main_photo: string
}

export interface Category {
  id: number
  name: string
  title: string
  is_enabled: boolean
}

export type Characteristic = {
  id: number
  type: CharacteristicType
  value: string
  comment: string
}

export type CharacteristicType = {
  id: number
  name: string
  comment: string
}