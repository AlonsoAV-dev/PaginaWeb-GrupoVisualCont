'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NoticiasAdmin() {
  const router = useRouter();
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNoticias();
  }, []);

  const loadNoticias = async () => {
    try {
      const res = await fetch('/api/noticias');
      const data = await res.json();
      setNoticias(data.noticias || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta noticia?')) return;

    try {
      const res = await fetch(`/api/noticias/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Actualizar estado inmediatamente eliminando la noticia
        setNoticias(prev => prev.filter(noticia => noticia.id_noticia !== id));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getEstadoBadge = (estado) => {
    const colors = {
      publicada: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      borrador: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Noticias
        </h1>
        <Link
          href="/admin/noticias/nueva"
          className="px-4 py-2 bg-[#257CD0] text-white rounded-md hover:bg-[#1e6bb8]"
        >
          + Nueva Noticia
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Autor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {noticias.map((noticia) => (
              <tr key={noticia.id_noticia}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {noticia.titulo}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {noticia.cod_unico}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {noticia.nombre_autor} 
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadge(
                      noticia.estado
                    )}`}
                  >
                    {noticia.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(noticia.creado_en).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/noticias/${noticia.id_noticia}`}
                    className="text-[#257CD0] hover:text-[#1e6bb8] mr-4"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(noticia.id_noticia)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
