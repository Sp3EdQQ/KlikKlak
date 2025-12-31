export type ProductData = {
  name: string
  price: number
  originalPrice?: number
  imageUrl: string
  rating: number
  reviews: number
  inStock: boolean
  badge?: string
}

export type Product = {
  id: string
  name: string
  slug: string
  price: string
  stock: number
  imageUrl: string | null
  categoryId: string | null
  producer: string | null
  mpn: string | null
  ean: string | null
  productPage: string | null
  description: string | null
  componentType: string | null
  componentId: string | null

  // CPU specific fields
  baseClock?: string
  turboClock?: string
  unlockedMultiplier?: boolean
  cores?: string
  threads?: string
  tdp?: string
  socket?: string
  integratedGpu?: string

  // GPU specific fields
  boostClock?: string
  memory?: string
  memoryType?: string

  // RAM specific fields
  capacity?: string
  speed?: string
  latency?: string

  // Storage specific fields
  capacity2?: string
  readSpeed?: string
  writeSpeed?: string
  formFactor?: string
  interface?: string

  // Motherboard specific fields
  chipset?: string
  formFactor2?: string
  memorySlots?: string
  maxMemory?: string

  // PSU specific fields
  wattage?: string
  efficiency?: string
  modular?: string

  // Monitor specific fields
  screenSize?: string
  resolution?: string
  refreshRate?: string
  responseTime?: string
  panelType?: string

  createdAt?: string
  updatedAt?: string
}
