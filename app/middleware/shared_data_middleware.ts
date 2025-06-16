import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ShareAuthStatusMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Langkah 1: Secara eksplisit & diam-diam memeriksa apakah pengguna sudah login.
     * Metode .check() akan mengisi ctx.auth.user jika sesi valid,
     * tanpa menimbulkan error jika tidak login. Ini adalah kunci utamanya.
     */
    await ctx.auth.check()

    /**
     * Langkah 2: Bagikan status auth yang sudah pasti ter-update ke Inertia.
     */
    ctx.inertia.share({
      auth: {
        // .serialize() mengubahnya menjadi objek JavaScript sederhana,
        // aman untuk dikirim ke frontend.
        user: ctx.auth.user?.serialize(),
      },
    })

    /**
     * Lanjutkan ke proses berikutnya.
     */
    await next()
  }
}
