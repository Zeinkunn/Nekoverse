import { Head, usePage } from '@inertiajs/react'
import AdminLayout from '~/layouts/adminlayout' // <-- Gunakan layout baru
import type { SharedProps } from '../../types/index'

interface DashboardProps {
  stats: {
    totalProducts: number;
    todaysOrders: number;
    registeredUsers: number;
  };
  recentActivities: {
    icon: string;
    message: string;
    bgColor: string;
  }[];
}

export default function Dashboard() {
  const { auth, stats, recentActivities } = usePage<SharedProps & DashboardProps>().props;

  return (
    <>
      <Head title="Dashboard" />
      {/* Header dipindahkan ke dalam layout */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-pink-500">Dashboard Utama</h1>
        <p className="text-md text-gray-500">Selamat datang kembali, {auth.user?.name || 'Admin'}!</p>
      </header>

      {/* Kartu Statistik */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-pink-100 transform hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">Total Produk</h2>
          <p className="text-4xl font-bold text-pink-400">{stats.totalProducts}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-100 transform hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">Pesanan Hari Ini</h2>
          <p className="text-4xl font-bold text-blue-400">{stats.todaysOrders}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 border border-yellow-100 transform hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">Pengguna Terdaftar</h2>
          <p className="text-4xl font-bold text-yellow-500">{stats.registeredUsers}</p>
        </div>
      </section>

      {/* Aktivitas Terbaru */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Aktivitas Terbaru</h2>
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex items-center p-4 rounded-lg" style={{ backgroundColor: activity.bgColor }}>
                <span className="mr-4 text-2xl">{activity.icon}</span>
                <span className="text-gray-700">{activity.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}


// Terapkan layout baru ke halaman ini
Dashboard.layout = (page: React.ReactElement) => <AdminLayout>{page}</AdminLayout>