import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class ProductsController {
  /**
   * Validator untuk membuat dan mengedit produk.
   */
  protected productValidator = vine.compile(
    vine.object({
      name: vine.string().trim().minLength(3),
      description: vine.string().trim().optional(),
      basePrice: vine.number().positive(),
      status: vine.enum(['published', 'draft', 'archived']),
      // UPDATE: Tambahkan validasi untuk is_featured.
      // vine.accepted() hanya menerima 'on' atau true.
      isFeatured: vine.accepted().optional(),
    })
  )

  /**
   * Menampilkan daftar semua produk.
   */
  async index({ inertia }: HttpContext) {
    const products = await Product.query().orderBy('createdAt', 'desc')
    return inertia.render('admin/products/index', {
      products: products.map((p) => p.serialize()),
    })
  }

  /**
   * Menampilkan form untuk membuat produk baru.
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('admin/products/create')
  }

  /**
   * Menyimpan produk baru ke database.
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(this.productValidator)

    // Konversi isFeatured dari 'on' (dari checkbox) menjadi boolean
    const data = {
      ...payload,
      isFeatured: !!payload.isFeatured,
    }

    await Product.create(data)

    return response.redirect().toRoute('admin.products.index')
  }

  /**
   * Menampilkan form untuk mengedit produk yang ada.
   */
  async edit({ params, inertia }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return inertia.render('admin/products/edit', {
      product: product.serialize(),
    })
  }

  /**
   * Memperbarui produk di database.
   */
  async update({ params, request, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const payload = await request.validateUsing(this.productValidator)

    const data = {
      ...payload,
      isFeatured: !!payload.isFeatured,
    }

    product.merge(data)
    await product.save()

    return response.redirect().toRoute('admin.products.index')
  }
}
