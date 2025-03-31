// src/types.ts
export interface Item {
  id: number
  name: string
  description: string
  link: string
  image: string
  isFeatured: number
}

export interface Category {
  name: string
  items: Item[]
}
