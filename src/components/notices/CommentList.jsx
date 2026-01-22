'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, User } from 'lucide-react';

export default function CommentList({ noticiaId }) {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const res = await fetch(`/api/comentarios/publicos?noticia=${noticiaId}`);
        if (!res.ok) throw new Error('Error al cargar comentarios');
        
        const data = await res.json();
        setComentarios(data.comentarios || []);
      } catch (error) {
        console.error('Error fetching comentarios:', error);
        setError('No se pudieron cargar los comentarios');
      } finally {
        setLoading(false);
      }
    };

    if (noticiaId) {
      fetchComentarios();
    }
  }, [noticiaId]);

  const formatFecha = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    const now = new Date();
    const diff = now - date;
    
    // Menos de 1 hora
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return minutes <= 1 ? 'Hace un momento' : `Hace ${minutes} minutos`;
    }
    
    // Menos de 24 horas
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    }
    
    // Menos de 7 días
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000);
      return `Hace ${days} día${days > 1 ? 's' : ''}`;
    }
    
    // Fecha completa
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl p-6 h-32"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl p-6">
        {error}
      </div>
    );
  }

  if (comentarios.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">
          No hay comentarios todavía. ¡Sé el primero en comentar!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        {comentarios.length} Comentario{comentarios.length !== 1 ? 's' : ''}
      </h3>
      
      {comentarios.map((comentario) => (
        <div 
          key={comentario.id_comentario} 
          className="bg-white dark:bg-[#272829] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Header del comentario */}
          <div className="flex items-start gap-4 mb-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            
            {/* Información del autor */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {comentario.autor_nombre}
                </h4>
                {comentario.autor_tipo === 'interno' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    Equipo
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatFecha(comentario.creado_en)}
              </p>
            </div>
          </div>

          {/* Contenido del comentario */}
          <div className="ml-14">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
              {comentario.comentario}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
