import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'
import Product from '#models/product'

export default class extends BaseSeeder {
  async run() {
    // 1. Buat Kategori
    const tshirtCategory = await Category.create({ name: 'T-Shirt' })
    const hoodieCategory = await Category.create({ name: 'Hoodie' })
    const stickerCategory = await Category.create({ name: 'Stickers' })

    // 2. Buat Produk
    const sakuraTshirt = await Product.create({
      name: 'Sakura Blossom T-Shirt',
      description: 'T-shirt katun premium dengan motif bunga sakura.',
      basePrice: 169000,
      status: 'published',
      isFeatured: true,
    })

    const yukiHoodie = await Product.create({
      name: 'Yuki Edition Hoodie',
      description: 'Hoodie edisi terbatas dengan karakter original Yuki.',
      basePrice: 299000,
      status: 'published',
      isFeatured: true,
    })

    const chibiStickers = await Product.create({
      name: 'Chibi Collection Stickers',
      description: 'Satu set stiker vinyl dengan karakter-karakter chibi lucu.',
      basePrice: 45000,
      status: 'published',
      isFeatured: true,
    })

    // 3. Kaitkan Produk dengan Kategori
    await sakuraTshirt.related('categories').attach([tshirtCategory.id])
    await yukiHoodie.related('categories').attach([hoodieCategory.id])
    await chibiStickers.related('categories').attach([stickerCategory.id])

    // 4. Buat Varian untuk Setiap Produk
    await sakuraTshirt.related('variants').createMany([
      { sku: 'SKU-SBTS-S', variantType: 'Ukuran', variantValue: 'S', stockQuantity: 10 },
      { sku: 'SKU-SBTS-M', variantType: 'Ukuran', variantValue: 'M', stockQuantity: 15 },
      { sku: 'SKU-SBTS-L', variantType: 'Ukuran', variantValue: 'L', stockQuantity: 5 },
    ])

    await yukiHoodie.related('variants').createMany([
      {
        sku: 'SKU-YUKI-M',
        variantType: 'Ukuran',
        variantValue: 'M',
        stockQuantity: 20,
        price: 310000,
      },
      {
        sku: 'SKU-YUKI-L',
        variantType: 'Ukuran',
        variantValue: 'L',
        stockQuantity: 10,
        price: 310000,
      },
    ])

    await chibiStickers.related('variants').create({
      sku: 'SKU-CHIBI-PACK',
      variantType: 'Tipe',
      variantValue: 'Pack',
      stockQuantity: 50,
    })
  }
}
