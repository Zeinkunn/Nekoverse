import { Head, Link, usePage } from '@inertiajs/react'
import AdminLayout from '~/layouts/adminlayout'
import type { SharedProps } from '~/types'

interface Product {
  id: number;
  name: string;
  basePrice: number;
  status: 'published' | 'draft' | 'archived';
  isFeatured: boolean;
}

interface AdminProductsProps {
  products: Product[];
}

export default function Index() {
  const { products } = usePage<SharedProps & AdminProductsProps>().props

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
  
  return (
    <>
      <Head title="Manajemen Produk" />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="mt-1 text-sm text-gray-500">Kelola semua produk di toko Anda.</p>
        </div>
        <Link 
          href="/admin/products/create"
          className="inline-flex items-center px-4 py-2 bg-pink-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-pink-600 active:bg-pink-700"
        >
          Tambah Produk
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Produk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unggulan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Dasar</th>
              <th className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(product.status)}`}>{product.status}</span></td>
                <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isFeatured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{product.isFeatured ? 'Ya' : 'Tidak'}</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.basePrice)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

Index.layout = (page: React.ReactElement) => <AdminLayout>{page}</AdminLayout>
