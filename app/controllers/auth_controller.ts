// app/Controllers/AuthController.ts

import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Menampilkan halaman/form untuk registrasi.
   */
  async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  /**
   * Memproses data dari form registrasi, membuat user baru,
   * dan langsung login.
   */
  async store({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    await auth.use('web').login(user)

    await session.commit()

    return response.redirect().toRoute('home')
  }

  /**
   * Menampilkan halaman/form untuk login.
   */
  async showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  /**
   * Memproses data dari form login dan memverifikasi kredensial.
   */
  async handleLogin({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      // FIX: verifyCredentials sudah menemukan dan mengembalikan user jika berhasil.
      // Kita tidak perlu mencari user lagi secara manual.
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      // Paksa sesi untuk disimpan sebelum redirect
      await session.commit()

      return response.redirect().toRoute('home')
    } catch (error) {
      session.flash({
        errors: {
          login: 'Email atau password tidak valid.',
        },
      })
      return response.redirect().back()
    }
  }

  /**
   * Proses logout pengguna.
   */
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()

    // Paksa sesi untuk disimpan sebelum redirect
    await session.commit()

    return response.redirect().toRoute('home')
  }
}
