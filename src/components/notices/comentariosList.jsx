'use client';
import { useEffect, useState } from 'react';

export default function ComentariosList({ noticiaId }) {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComentarios();
  }, [noticiaId]);

  const loadComentarios = async () => {
    try {
      const res = await fetch(`/api/comentarios?noticia=${noticiaId}&estado=1`);
      const data = await res.json();
      setComentarios(data.comentarios || []);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Cargando comentarios...</div>;
  }

  if (comentarios.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Comentarios
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          No hay comentarios aún. ¡Sé el primero en comentar!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Comentarios ({comentarios.length})
      </h3>
      <div className="space-y-4">
        {comentarios.map((comentario) => (
          <div
            key={comentario.id_comentario}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {comentario.autor_nombre}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comentario.creado_en).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {comentario.comentario}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
