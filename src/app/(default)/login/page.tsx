"use client";

import { useLogin } from "./useLogin"; // Menggunakan custom hook yang sudah kita perbaiki sebelumnya

export default function LoginPage() {
  // Ambil state dan fungsi handler yang berasal dari logika Code 1 (via useLogin)
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      {/* Container Grid untuk membagi Form dan Info Card */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* --- BAGIAN KIRI: FORM LOGIN (Gaya Visual Code 2 + Logika Code 1) --- */}
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign In</h2>
            <p className="text-sm text-gray-500 mt-2">Masuk untuk mengakses sistem terproteksi</p>
          </div>

          {/* Kotak Error dari Code 1 */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 text-sm rounded-r-lg font-mono">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-blue-800 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Memvalidasi Sesi di Redis...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center pt-6 border-t border-gray-100 mt-6">
            <p className="text-xs text-gray-400 font-mono">
              Secured Session via Redis Cache & PostgreSQL
            </p>
          </div>
        </div>

        {/* --- BAGIAN KANAN: INFO CARD (Dipertahankan dari Code 2) --- */}
        <div className="hidden lg:block space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm font-bold text-gray-600 text-sm">
            <button
              type="button"
              className="w-full py-3 rounded-lg text-white font-bold shadow-md transition-all bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98]"
            >
              Download Curriculum Vitae
            </button>
          </div>

          <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 rounded-full opacity-50"></div>
            
            <h3 className="text-xl font-bold mb-4 relative z-10 flex items-center gap-2">
              <i className="fas fa-info-circle"></i> Demo Account Information
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">Role: User</p>
                <p className="font-mono text-sm">email : user@rizky.com</p>
                <p className="font-mono text-sm">pass  : password123</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-blue-100">
                  <i className="fas fa-check-circle text-green-400"></i>
                  Access Scope: Product Only
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">Role: Admin</p>
                <p className="font-mono text-sm">email : admin@rizky.com</p>
                <p className="font-mono text-sm">pass  : password123</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-blue-100">
                  <i className="fas fa-check-circle text-green-400"></i>
                  Access Scope: Dashboard & Product
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}