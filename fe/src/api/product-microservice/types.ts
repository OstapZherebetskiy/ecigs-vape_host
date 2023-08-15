export type Product = {
  id: number
  // category: Category
  // characteristics: Characteristic[]
  name: string
  price: string
  description: string
  in_stock: boolean
  // stock_count: number
  // photo_1: string
  // photo_2: string
  // photo_3: string
  // photo_4: string
  // photo_5: string
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