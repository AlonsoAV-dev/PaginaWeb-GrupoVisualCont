'use client';
import { useState } from 'react';

export default function ComentariosForm({ noticiaId }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    comentario: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_noticia: noticiaId,
          nombre: formData.nombre,
          email: formData.email,
          comentario: formData.comentario,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: 'success',
          text: 'Comentario enviado. Será visible después de ser aprobado.',
        });
        setFormData({ nombre: '', email: '', comentario: '' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al enviar comentario' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Dejar un comentario
      </h3>

      {message.text && (
        <div
          className={`mb-4 p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-[#257CD0] focus:border-[#257CD0]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-[#257CD0] focus:border-[#257CD0]"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="comentario"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Comentario *
          </label>
          <textarea
            id="comentario"
            rows="4"
            value={formData.comentario}
            onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-[#257CD0] focus:border-[#257CD0]"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#257CD0] text-white rounded-md hover:bg-[#1e6bb8] disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar Comentario'}
        </button>
      </form>
    </div>
  );
}
