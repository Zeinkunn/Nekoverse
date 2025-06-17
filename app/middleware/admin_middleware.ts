import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { Exception } from '@adonisjs/core/exceptions'

/**
 * Middleware untuk memastikan hanya user dengan role 'admin'
 * yang bisa mengakses rute tertentu.
 */
export default class AdminMiddleware {
  async handle({ auth }: HttpContext, next: NextFn) {
    /**
     * FIX: Disederhanakan. Middleware 'auth' sudah berjalan sebelumnya,
     * sehingga kita bisa langsung memeriksa peran pengguna.
     * Penggunaan `auth.user!` aman di sini karena middleware 'auth' akan
     * melempar error jika user tidak ditemukan.
     */
    if (auth.user!.role !== 'admin') {
      throw new Exception('Akses ditolak: Anda harus menjadi admin.', { status: 403 })
    }

    /**
     * Panggil middleware atau controller berikutnya.
     */
    await next()
  }
}
