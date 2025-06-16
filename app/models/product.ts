import { DateTime } from 'luxon'
import string from '@adonisjs/core/helpers/string'
import { BaseModel, beforeSave, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'
import ProductVariant from '#models/product_variant'
import ProductReview from '#models/product_review'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column()
  declare basePrice: number

  @column()
  declare status: 'published' | 'draft' | 'archived'

  @column()
  declare isFeatured: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  public static async generateSlug(product: Product) {
    if (product.$dirty.name) {
      product.slug = string.slug(product.name)
    }
  }

  @hasMany(() => ProductVariant)
  declare variants: HasMany<typeof ProductVariant>

  @hasMany(() => ProductReview)
  declare reviews: HasMany<typeof ProductReview>

  // FIX: Tambahkan pivotTimestamps: true di sini
  @manyToMany(() => Category, {
    pivotTable: 'product_category',
    pivotTimestamps: true,
  })
  declare categories: ManyToMany<typeof Category>
}
