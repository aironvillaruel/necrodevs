// types.ts
export interface Item {
  id: number
  name: string
  description: string
  link: string
  image: string
  isFeatured: number
}

export interface Category {
  id: number
  name: string
  icon: string
  items: Item[]
}

export interface Data {
  categories: Category[]
}
