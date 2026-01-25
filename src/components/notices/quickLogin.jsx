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

      // Abrir el dashboard en una nueva pestaña
      window.open('/admin/dashboard', '_blank', 'noopener,noreferrer');
      
      // Actualizar el estado actual para mostrar el botón de "Ingresar al Panel"
      checkAuth();
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
      <div className="bg-white dark:bg-gray-800 border-[#257CD0] border-2 rounded-bl-xl p-4 sm:p-6 text-center shadow-md">
        <p className="text-gray-900 dark:text-gray-100 text-sm sm:text-base mb-3">
          {getGreeting()}, <span className="font-semibold">{user.nombre}</span>
        </p>
        <Link
          href="/admin/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full py-2 px-4 bg-[#257CD0] text-white rounded-md hover:bg-[#1e6bb8] transition-colors text-sm sm:text-base"
        >
          Ingresar al Panel
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-[#257CD0] dark:border-[#1e6bb8] border-2 rounded-bl-xl p-3 sm:p-4 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:ring-[#257CD0] focus:border-[#257CD0] dark:focus:ring-[#1e6bb8] dark:focus:border-[#1e6bb8] placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:ring-[#257CD0] focus:border-[#257CD0] dark:focus:ring-[#1e6bb8] dark:focus:border-[#1e6bb8] placeholder:text-gray-500 dark:placeholder:text-gray-400"
            required
          />
        </div>
        {error && (
          <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-md">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 text-sm sm:text-base bg-[#257CD0] text-white rounded-md hover:bg-[#1e6bb8] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
