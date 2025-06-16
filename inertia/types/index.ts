export interface SharedProps {
  auth: {
    user: {
      id: number
      name: string
      email: string
      role: 'customer' | 'admin'
    } | null
  }
  errors?: Record<string, string>
  flash?: {
    [key: string]: any
  }
  // Menambahkan index signature untuk memenuhi constraint PageProps dari Inertia
  [key: string]: any
}

// Tipe spesifik untuk properti halaman Home
export interface HomeProps {
  featuredProducts: any[] // Ganti 'any' dengan tipe produk yang benar nanti
}
