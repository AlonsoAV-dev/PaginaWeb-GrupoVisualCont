'use client';
import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function CommentForm({ noticiaId }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    comentario: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Verificar si el usuario está logueado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setIsLoggedIn(true);
            setFormData(prev => ({
              ...prev,
              nombre: data.user.nombre || '',
              email: data.user.email || ''
            }));
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_noticia: noticiaId,
          nombre: formData.nombre,
          email: formData.email,
          comentario: formData.comentario
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Comentario enviado. Será visible después de ser aprobado.' 
        });
        // Limpiar solo el comentario si está logueado
        if (isLoggedIn) {
          setFormData(prev => ({ ...prev, comentario: '' }));
        } else {
          setFormData({ nombre: '', email: '', comentario: '' });
        }
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'Error al enviar el comentario' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Error de conexión. Intenta nuevamente.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (checkingAuth) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-64"></div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#272829] rounded-xl p-6 shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Deja una respuesta
      </h3>
      
      {!isLoggedIn && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Tu dirección de correo electrónico no será publicada. Los campos obligatorios están marcados con <span className="text-red-500">*</span>
        </p>
      )}

      {message.text && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Comentario */}
        <div>
          <label 
            htmlFor="comentario" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Comentario <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comentario"
            name="comentario"
            rows="5"
            required
            value={formData.comentario}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
            placeholder="Escribe tu comentario..."
          />
        </div>

        {/* Nombre y Email solo si NO está logueado */}
        {!isLoggedIn && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="nombre" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
                placeholder="tu@email.com"
              />
            </div>
          </div>
        )}

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Publicar comentario
            </>
          )}
        </button>
      </form>
    </div>
  );
}
