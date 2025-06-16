import { DateTime } from 'luxon'
import string from '@adonisjs/core/helpers/string'
import { BaseModel, beforeSave, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeSave()
  public static async generateSlug(category: Category) {
    if (category.$dirty.name) {
      category.slug = string.slug(category.name)
    }
  }

  // FIX: Tambahkan pivotTimestamps: true di sini
  @manyToMany(() => Product, {
    pivotTable: 'product_category',
    pivotTimestamps: true,
  })
  declare products: ManyToMany<typeof Product>
}
