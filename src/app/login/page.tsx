'use client';

import { useLogin } from './useLogin';

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 font-sans">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl space-y-6">
        
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">Selamat Datang</h1>
          <p className="text-sm text-gray-400">Masuk untuk mengakses sistem terproteksi</p>
        </div>

        {/* Kotak Error */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 text-sm p-3 rounded-lg font-mono">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white p-3 rounded-lg font-semibold transition mt-2"
          >
            {loading ? 'Memvalidasi Sesi di Redis...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-500 font-mono">
            Secured Session via Redis Cache & PostgreSQL
          </p>
        </div>

      </div>
    </div>
  );
}