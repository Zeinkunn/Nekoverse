import { Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '../types/index'

export default function Navbar() {
  const { props } = usePage<SharedProps>()
  const { auth } = props

  // =================================================================
  // DIAGNOSTIK: Tampilkan seluruh props yang diterima dari backend.
  // Ini akan membantu kita melihat apakah data 'auth' benar-benar sampai.
  // Buka console di browser (F12) untuk melihat hasilnya.
  console.log('Data yang diterima Navbar:', props)
  // =================================================================

  // Gunakan optional chaining untuk keamanan, meskipun data seharusnya ada.
  const user = auth?.user

  return (
    <header className="navbar fixed w-full z-50 py-4 px-6 md:px-12 bg-white/80 backdrop-blur-sm shadow-sm">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="h-12 w-12 mr-3 bg-white rounded-full flex items-center justify-center shadow-md">
            <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" className="h-8 w-8 fill-current text-pink-400">
              <path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M12,14C13.11,14 14,15.36 14,17H10C10,15.36 10.89,14 12,14Z" />
            </svg>
          </div>
          <span className="font-['Fredoka_One'] text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400">NekoVerse</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-indigo-900 font-medium hover:text-pink-400 transition-colors">Home</Link>
          <Link href="#" className="text-indigo-900 font-medium hover:text-pink-400 transition-colors">Koleksi</Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-indigo-900 font-medium hover:text-pink-400 transition-colors">Dashboard</Link>
              <Link href="/auth/logout" method="post" as="button" className="bg-red-400 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300">Logout</Link>
            </>
          ) : (
            <Link href="/auth/login" className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300">Login</Link>
          )}
        </div>
      </nav>
    </header>
  )
}
