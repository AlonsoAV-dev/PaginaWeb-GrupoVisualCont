'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.usuario);
      } else {
        // NO está autenticado, redirigir a noticias
        window.location.href = '/noticias';
      }
    } catch (error) {
      // Error de red, redirigir a noticias
      window.location.href = '/noticias';
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 shadow-lg" style={{ backgroundColor: 'rgba(31, 77, 142, 1)' }}>
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-center h-16 text-white border-b border-white border-opacity-20">
            <h1 className="text-xl font-bold">VisualCont</h1>
          </div>

          {/* User Info */}
          <div className="p-4 ml-3 border-b border-white border-opacity-20">
            <p className="text-sm font-medium text-white flex-1 ml-2">
              {user.nombre}
            </p>
            <p className="text-xs text-white text-opacity-70 bg-blue-900 inline-block px-2 py-1 rounded-md mt-1 font-semibold">
              {user.rol.toUpperCase()}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center px-4 py-2 text-white text-opacity-90 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/noticias"
              className="flex items-center px-4 py-2 text-white text-opacity-90 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors"
            >
              Noticias
            </Link>
            <Link
              href="/admin/comentarios"
              className="flex items-center px-4 py-2 text-white text-opacity-90 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors"
            >
              Comentarios
            </Link>
            <Link
              href="/admin/keywords"
              className="flex items-center px-4 py-2 text-white text-opacity-90 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors"
            >
              Keywords
            </Link>
            {user.rol === 'admin' && (
              <Link
                href="/admin/usuarios"
                className="flex items-center px-4 py-2 text-white text-opacity-90 hover:bg-white hover:bg-opacity-10 rounded-md transition-colors"
              >
                Usuarios
              </Link>
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white border-opacity-20">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">{children}</div>
    </div>
  );
}
