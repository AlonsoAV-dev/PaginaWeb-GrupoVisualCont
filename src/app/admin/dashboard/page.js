'use client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    noticias: 0,
    comentariosPendientes: 0,
    usuarios: 0,
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserAndStats();
  }, []);

  const loadUserAndStats = async () => {
    try {
      // Obtener usuario actual
      const userRes = await fetch('/api/auth/me');
      const userData = await userRes.json();
      
      if (userData.success) {
        setUser(userData.usuario);
      }

      // Cargar estadísticas
      const [noticiasRes, comentariosRes, usuariosRes] = await Promise.all([
        fetch('/api/noticias'),
        fetch('/api/comentarios?estado=2'),
        userData.usuario?.rol === 'admin' ? fetch('/api/usuarios') : Promise.resolve({ json: () => ({ usuarios: [] }) }),
      ]);

      const noticias = await noticiasRes.json();
      const comentarios = await comentariosRes.json();
      const usuarios = userData.usuario?.rol === 'admin' ? await usuariosRes.json() : { usuarios: [] };

      setStats({
        noticias: noticias.noticias?.length || 0,
        comentariosPendientes: comentarios.comentarios?.length || 0,
        usuarios: usuarios.usuarios?.length || 0,
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div>
      {/* Título personalizado por rol */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {user?.rol === 'admin' ? 'Dashboard de Administración' : 'Dashboard de Editor'}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {user?.rol === 'admin' 
          ? 'Bienvenido al panel de control completo del sistema' 
          : 'Bienvenido a tu panel de gestión de contenido'}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-[#257CD0] rounded-md p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Noticias
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.noticias}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Comentarios Pendientes
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.comentariosPendientes}
              </p>
            </div>
          </div>
        </div>

        {user?.rol === 'admin' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Usuarios
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.usuarios}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {user?.rol === 'admin' ? 'Acciones Rápidas' : 'Mis Acciones'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/noticias"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {user?.rol === 'admin' ? 'Gestionar Noticias' : 'Mis Noticias'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {user?.rol === 'admin' 
                ? 'Administra todas las publicaciones del blog' 
                : 'Crea y edita tus publicaciones'}
            </p>
          </a>
          <a
            href="/admin/comentarios"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Revisar Comentarios
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {user?.rol === 'admin' 
                ? 'Modera todos los comentarios del sistema' 
                : 'Gestiona los comentarios pendientes'}
            </p>
          </a>
          {user?.rol === 'admin' && (
            <a
              href="/admin/usuarios"
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Gestionar Usuarios
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Administra los usuarios del sistema
              </p>
            </a>
          )}
          <a
            href="/admin/keywords"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Keywords SEO
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Gestiona las palabras clave para SEO
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
