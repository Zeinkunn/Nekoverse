import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class PagesController {
  /**
   * Menampilkan halaman utama (homepage).
   */
  async home({ inertia }: HttpContext) {
    // Ambil 8 produk yang ditandai sebagai 'featured'
    const featuredProducts = await Product.query()
      .where('is_featured', true)
      .where('status', 'published')
      .preload('variants') // Muat juga data variannya
      .limit(8)

    return inertia.render('home/index', {
      // Kirim data produk ke komponen frontend
      featuredProducts: featuredProducts.map((p) => p.serialize()),
    })
  }

  /**
   * Menampilkan dashboard (halaman yang dilindungi).
   */
  async dashboard({ inertia }: HttpContext) {
    // (Kode ini bisa kita kembangkan nanti)
    return inertia.render('dashboard/index', {
      stats: {
        totalProducts: 128,
        todaysOrders: 32,
        registeredUsers: 540,
      },
      recentActivities: [
        { icon: '📦', message: 'Pesanan #1245 dari Ayaka telah diproses.', bgColor: '#FFF1F2' },
        { icon: '🛒', message: 'Produk baru "Neko Hoodie" ditambahkan.', bgColor: '#EFF6FF' },
        { icon: '👥', message: 'Pengguna baru "Hanako" mendaftar.', bgColor: '#FFFBEB' },
      ],
    })
  }
}
