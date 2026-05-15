'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [protectedData, setProtectedData] = useState<any>(null);

  const handleRegister = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  const fetchProtectedData = async () => {
    const res = await fetch('/api/protected');
    const data = await res.json();
    if (res.ok) {
      setProtectedData(data);
      setMessage(data.message);
    } else {
      setProtectedData(null);
      setMessage(data.error);
    }
  };

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    const data = await res.json();
    setProtectedData(null);
    setMessage(data.message || data.error);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold border-b border-gray-700 pb-2">Senior Architecture: Next.js + Prisma + Redis</h1>
        
        {/* Form Inputs */}
        <div className="bg-gray-800 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Authentication Form</h2>
          <input type="text" placeholder="Nama (Untuk Register)" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500" />
          
          <div className="flex gap-4">
            <button onClick={handleRegister} className="flex-1 bg-green-600 hover:bg-green-700 p-2 rounded font-medium transition">Register</button>
            <button onClick={handleLogin} className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded font-medium transition">Login</button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-4">
          <button onClick={fetchProtectedData} className="flex-1 bg-purple-600 hover:bg-purple-700 p-3 rounded font-semibold transition">Ambil Data Terproteksi (Cek Redis & DB)</button>
          <button onClick={handleLogout} className="flex-1 bg-red-600 hover:bg-red-700 p-3 rounded font-semibold transition">Logout</button>
        </div>

        {/* Console / Status Box */}
        <div className="bg-black p-4 rounded border border-gray-800 font-mono text-sm">
          <p className="text-gray-400">// Status / Response Message:</p>
          <p className="text-green-400 mt-1">{message || 'Idle'}</p>
        </div>

        {/* Protected Data Display */}
        {protectedData && (
          <div className="bg-gray-800 p-6 rounded-lg font-mono">
            <h3 className="text-yellow-400 font-bold mb-2">🔒 Data Sensitif Terbuka:</h3>
            <pre className="text-xs bg-gray-950 p-4 rounded overflow-x-auto text-gray-300">
              {JSON.stringify(protectedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}