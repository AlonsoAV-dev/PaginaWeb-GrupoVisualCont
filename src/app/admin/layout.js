'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faNewspaper, 
  faComments, 
  faTags, 
  faLayerGroup, 
  faUsers, 
  faRightFromBracket,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { href: '/admin/dashboard', icon: faChartLine, label: 'Dashboard' },
    { href: '/admin/noticias', icon: faNewspaper, label: 'Noticias' },
    { href: '/admin/comentarios', icon: faComments, label: 'Comentarios' },
    { href: '/admin/keywords', icon: faTags, label: 'Keywords' },
    { href: '/admin/categorias', icon: faLayerGroup, label: 'Categorías' },
  ];

  if (user.rol === 'admin') {
    menuItems.push({ href: '/admin/usuarios', icon: faUsers, label: 'Usuarios' });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
      >
        <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} className="w-5 h-5" />
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Azul oscuro profesional */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-[rgba(30,77,142,1)] dark:bg-[rgba(20,55,100,1)] shadow-xl transform transition-transform duration-300 z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-center h-16 border-b border-[rgba(20,60,110,0.5)]">
            <div className="text-center">
              <h1 className="text-xl font-semibold text-white tracking-tight">VisualCont</h1>
              <p className="text-xs text-blue-200 mt-0.5">Panel de Gestión</p>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-[rgba(20,60,110,0.5)]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[rgba(50,110,180,1)] flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                {user.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold ml-1 text-white truncate">
                  {user.nombre}
                </p>
                <span className="inline-block text-xs bg-blue-900 px-2 py-0.5 rounded text-blue-200 uppercase tracking-wide font-medium">
                  {user.rol}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[rgba(50,110,180,1)] text-white shadow-sm'
                      : 'text-blue-100 hover:bg-[rgba(40,90,160,0.5)] hover:text-white'
                  }`}
                >
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className={`w-4 h-4 mr-3 ${isActive ? 'text-white' : 'text-blue-200'}`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-[rgba(20,60,110,0.5)]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[rgba(20,60,110,0.8)] hover:bg-[rgba(20,60,110,1)] rounded-md transition-colors"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
