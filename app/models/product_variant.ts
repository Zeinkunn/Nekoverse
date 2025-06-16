import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'

export default class ProductVariant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare sku: string

  @column()
  declare variantType: string

  @column()
  declare variantValue: string

  @column()
  declare price: number | null

  @column()
  declare stockQuantity: number

  @column()
  declare imageUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @computed()
  public get finalPrice(): number | undefined {
    if (this.product) {
      return this.price ?? this.product.basePrice
    }
    return this.price ?? undefined
  }

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
