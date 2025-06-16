import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Impor controller yang akan kita gunakan
const AuthController = () => import('#controllers/auth_controller')
const PagesController = () => import('#controllers/pages_controller')

/**
 * Rute untuk halaman utama.
 * FIX: Mengarahkan rute ke PagesController.home
 */
router.get('/', [PagesController, 'home']).as('home')

/**
 * Kelompokkan semua rute yang berhubungan dengan otentikasi
 * di bawah prefix '/auth'.
 */
router
  .group(() => {
    // Rute untuk menampilkan form registrasi
    router
      .get('/register', [AuthController, 'showRegister'])
      .as('register.show')
      .use(middleware.guest())

    // Rute untuk memproses data registrasi
    router.post('/register', [AuthController, 'store']).as('register.store').use(middleware.guest())

    // Rute untuk menampilkan form login
    router.get('/login', [AuthController, 'showLogin']).as('login.show').use(middleware.guest())

    // Rute untuk memproses data login
    router
      .post('/login', [AuthController, 'handleLogin'])
      .as('login.handle')
      .use(middleware.guest())

    // Rute untuk logout (harus dilindungi, hanya untuk yang sudah login)
    router.post('/logout', [AuthController, 'logout']).as('logout').use(middleware.auth())
  })
  .prefix('/auth')

/**
 * Kelompokkan semua rute yang memerlukan login.
 * Contoh: Dashboard
 */
router
  .group(() => {
    // FIX: Mengarahkan rute ke PagesController.dashboard
    router.get('/dashboard', [PagesController, 'dashboard']).as('dashboard')
  })
  .use(middleware.auth()) // Middleware ini melindungi semua rute di dalam grup
