import { PropsWithChildren } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Navbar from '../components/navbar'
//import type { SharedProps } from '../types'

export default function AdminLayout({ children }: PropsWithChildren) {
  const { url } = usePage()

  const isActive = (href: string) => url.startsWith(href)

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-28 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium ${
                  isActive('/dashboard') && !url.includes('/admin')
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="truncate">Dashboard Utama</span>
              </Link>
              <Link
                href="/admin/products"
                className={`group rounded-md px-3 py-2 flex items-center text-sm font-medium ${
                  isActive('/admin/products')
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="truncate">Manajemen Produk</span>
              </Link>
            </nav>
          </aside>
          <main className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
