import { Head, Link, useForm } from '@inertiajs/react'
import AdminLayout from '~/layouts/adminlayout'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    basePrice: 0,
    status: 'draft', // Nilai default
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post('/admin/products')
  }

  return (
    <>
      <Head title="Tambah Produk Baru" />
      <form onSubmit={submit}>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-lg font-medium leading-6 text-gray-900">Informasi Produk</h1>
              <p className="mt-1 text-sm text-gray-500">Isi detail dasar untuk produk baru.</p>
            </div>

            {/* Nama Produk */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Produk</label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Deskripsi */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                id="description"
                rows={4}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Harga Dasar */}
            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Harga Dasar (IDR)</label>
              <input
                type="number"
                id="basePrice"
                value={data.basePrice}
                onChange={(e) => setData('basePrice', Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.basePrice && <p className="mt-2 text-sm text-red-600">{errors.basePrice}</p>}
            </div>
            
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              {errors.status && <p className="mt-2 text-sm text-red-600">{errors.status}</p>}
            </div>

          </div>
        </div>

        <div className="mt-6 flex justify-end gap-x-4">
          <Link href="/admin/products" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Batal
          </Link>
          <button
            type="submit"
            disabled={processing}
            className="inline-flex justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 disabled:opacity-50"
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </>
  )
}

Create.layout = (page: React.ReactElement) => <AdminLayout>{page}</AdminLayout>