'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function QuickLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      // Usuario no autenticado
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  if (user) {
    return (
      <div className="bg-white border-[#257CD0] border-2 rounded-bl-xl p-6 text-center">
        <p className="text-gray-900 text-base mb-3">
          {getGreeting()}, <span className="font-semibold">{user.nombre}</span>
        </p>
        <Link
          href="/admin/dashboard"
          className="inline-block w-full py-2 px-4 bg-[#257CD0] text-white rounded-md hover:bg-[#1e6bb8] transition-colors"
        >
          Ingresar al Panel
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border-[#257CD0] border-2 rounded-bl-xl p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-900 focus:ring-[#257CD0] focus:border-[#257CD0]"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-900 focus:ring-[#257CD0] focus:border-[#257CD0]"
            required
          />
        </div>
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-sm bg-[#257CD0] text-white rounded-md hover:bg-[#1e6bb8] disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
