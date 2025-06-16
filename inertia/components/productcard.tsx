import { Link } from '@inertiajs/react'

// Definisikan tipe untuk data produk yang diterima
interface ProductVariant {
  finalPrice: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  basePrice: number;
  variants: ProductVariant[];
  // Sementara gunakan URL placeholder
  imageUrl: string | null;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Ambil harga dari varian pertama, atau gunakan harga dasar
  const displayPrice = product.variants[0]?.finalPrice || product.basePrice;

  return (
    <div className="product-card bg-white shadow-md overflow-hidden rounded-2xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/produk/${product.slug}`}>
        <div className="relative">
          <img 
            src={product.imageUrl || '[https://placehold.co/400x400/FFD6EC/414167?text=Neko](https://placehold.co/400x400/FFD6EC/414167?text=Neko)'} 
            alt={product.name} 
            className="w-full h-56 object-cover"
          />
          {/* Anda bisa menambahkan badge 'New' atau 'Pre-Order' di sini nanti */}
        </div>
      </Link>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 truncate" title={product.name}>
          <Link href={`/produk/${product.slug}`} className="hover:text-pink-500 transition-colors">
            {product.name}
          </Link>
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-900">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(displayPrice)}
          </span>
          <button className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
