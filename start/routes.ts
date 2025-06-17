import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Impor controller yang akan kita gunakan
const AuthController = () => import('#controllers/auth_controller')
const PagesController = () => import('#controllers/pages_controller')
const AdminProductsController = () => import('#controllers/admin/products_controller')

router.get('/', [PagesController, 'home']).as('home')

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

router
  .group(() => {
    // FIX: Mengarahkan rute ke PagesController.dashboard
    router.get('/dashboard', [PagesController, 'dashboard']).as('dashboard')
  })
  .use(middleware.auth()) // Middleware ini melindungi semua rute di dalam grup

router
  .group(() => {
    router.get('/products', [AdminProductsController, 'index']).as('admin.products.index')
    router.get('/products/create', [AdminProductsController, 'create']).as('admin.products.create')
    router.post('/products', [AdminProductsController, 'store']).as('admin.products.store')
    router.get('/products/:id/edit', [AdminProductsController, 'edit']).as('admin.products.edit')
    router.put('/products/:id', [AdminProductsController, 'update']).as('admin.products.update')
  })
  .prefix('/admin')
  .use(middleware.admin())
