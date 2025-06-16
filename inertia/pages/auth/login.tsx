import { useForm, Head, Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '../../types/index'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  const { props } = usePage<SharedProps>()
  const loginError = props.flash?.errors?.login

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post('/auth/login')
  }

  return (
    <>
      <Head title="Login" />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-indigo-900 mb-6">Login ke NekoVerse</h2>
          {loginError && <div className="text-red-500 text-sm text-center mb-4">{loginError}</div>}
          <form onSubmit={submit}>
            <div className="mb-4">
              <label className="block text-indigo-700 mb-1" htmlFor="email">Email</label>
              <input type="email" id="email" name="email" autoComplete="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300" />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
            <div className="mb-6">
              <label className="block text-indigo-700 mb-1" htmlFor="password">Password</label>
              <input type="password" id="password" name="password" autoComplete="current-password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300" />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>
            <button type="submit" className="w-full py-2 text-white font-semibold bg-gradient-to-r from-pink-400 to-blue-400 rounded-full hover:shadow-lg transition-all disabled:opacity-50" disabled={processing}>Login</button>
          </form>
          <p className="text-center text-sm text-indigo-700 mt-6">Belum punya akun? <Link href="/auth/register" className="text-pink-500 font-medium hover:underline">Daftar di sini</Link></p>
        </div>
      </div>
    </>
  )
}
