import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.create({
      name: 'Admin User',
      email: 'admin@admin.com',
      password: 'admin123', // Ganti dengan password aman
      role: 'admin',
    })
  }
}
