import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'product_variants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.string('sku').notNullable().unique()
      table.string('variant_type').notNullable()
      table.string('variant_value').notNullable()
      table.decimal('price', 12, 2).nullable()
      table.integer('stock_quantity').notNullable().defaultTo(0)
      table.string('image_url').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
