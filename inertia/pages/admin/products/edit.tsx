import { Head, Link, useForm, usePage } from '@inertiajs/react'
import AdminLayout from '~/layouts/adminlayout'
import type { SharedProps } from '~/types'

interface Product {
  id: number;
  name: string;
  description: string | null;
  basePrice: number;
  status: 'published' | 'draft' | 'archived';
  isFeatured: boolean;
}

interface EditProductProps {
  product: Product;
}

export default function Edit() {
  const { product } = usePage<SharedProps & EditProductProps>().props

  const { data, setData, put, processing, errors } = useForm({
    name: product.name,
    description: product.description || '',
    basePrice: product.basePrice,
    status: product.status,
    isFeatured: product.isFeatured,
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    put(`/admin/products/${product.id}`)
  }

  return (
    <>
      <Head title={`Edit Produk: ${product.name}`} />
      <form onSubmit={submit}>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div><h1 className="text-lg font-medium leading-6 text-gray-900">Edit Produk</h1><p className="mt-1 text-sm text-gray-500">Perbarui detail untuk produk ini.</p></div>
            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Produk</label><input type="text" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />{errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}</div>
            <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label><textarea id="description" rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />{errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}</div>
            <div><label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Harga Dasar (IDR)</label><input type="number" id="basePrice" value={data.basePrice} onChange={(e) => setData('basePrice', Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />{errors.basePrice && <p className="mt-2 text-sm text-red-600">{errors.basePrice}</p>}</div>
            <div><label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label><select id="status" value={data.status} onChange={(e) => setData('status', e.target.value as 'published' | 'draft' | 'archived')} className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select>{errors.status && <p className="mt-2 text-sm text-red-600">{errors.status}</p>}</div>
            <div className="relative flex items-start"><div className="flex h-6 items-center"><input id="isFeatured" type="checkbox" checked={data.isFeatured} onChange={(e) => setData('isFeatured', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/></div><div className="ml-3 text-sm leading-6"><label htmlFor="isFeatured" className="font-medium text-gray-900">Jadikan Produk Unggulan</label><p className="text-gray-500">Produk ini akan muncul di halaman utama.</p></div>{errors.isFeatured && <p className="mt-2 text-sm text-red-600">{errors.isFeatured}</p>}</div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-x-4"><Link href="/admin/products" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Batal</Link><button type="submit" disabled={processing} className="inline-flex justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 disabled:opacity-50">Update Produk</button></div>
      </form>
    </>
  )
}

Edit.layout = (page: React.ReactElement) => <AdminLayout>{page}</AdminLayout>
