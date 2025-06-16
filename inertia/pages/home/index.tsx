import { Head, usePage } from '@inertiajs/react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import ProductCard from '../../components/productcard' // <-- Impor komponen baru
import type { SharedProps, HomeProps } from '../../types/index'

export default function Home() {
  const { featuredProducts = [] } = usePage<SharedProps & HomeProps>().props;

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
      <Head title="Selamat Datang di NekoVerse" />
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* ... bagian Hero Banner tidak berubah ... */}
        <section className="pt-10 pb-10 md:pt-12 md:pb-20 px-6 relative overflow-hidden bg-pink-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 z-10 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-indigo-900">Spring Limited Drop</h1>
                <p className="text-lg md:text-xl text-indigo-700 mb-6">Koleksi terbatas dengan karakter anime spring season terbaru! Hanya tersedia hingga stok habis.</p>
                <div className="flex space-x-4 justify-center md:justify-start">
                  <a href="#" className="inline-block px-8 py-3 text-white font-medium bg-gradient-to-r from-pink-400 to-blue-400 rounded-full hover:shadow-lg transition-all">Lihat Koleksi</a>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0 relative z-10">
                <img src="https://placehold.co/600x600/FFC2E2/414167?text=NekoVerse" alt="NekoVerse Spring Collection" className="w-full h-auto rounded-3xl shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-indigo-900">Produk Unggulan</h2>
            {/* FIX: Tampilkan produk jika ada, atau pesan jika tidak ada */}
            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Mapping data produk dan render komponen ProductCard */}
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Belum ada produk unggulan untuk ditampilkan.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
