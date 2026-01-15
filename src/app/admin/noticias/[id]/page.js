'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function NoticiaEditor() {
  const router = useRouter();
  const params = useParams();
  const isEditing = params?.id && params.id !== 'nueva';

  const [formData, setFormData] = useState({
    cod_unico: '',
    titulo: '',
    slug: '',
    contenido: '',
    id_servicio: '',
    id_autor: '',
    estado: 'borrador',
    fecha_publicacion: '',
    keywords: [],
  });

  const [autores, setAutores] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
    if (isEditing) {
      loadNoticia();
    }
  }, []);

  const loadData = async () => {
    try {
      const [autoresRes, serviciosRes, keywordsRes] = await Promise.all([
        fetch('/api/autores'),
        fetch('/api/servicios'),
        fetch('/api/keywords'),
      ]);

      const autoresData = await autoresRes.json();
      const serviciosData = await serviciosRes.json();
      const keywordsData = await keywordsRes.json();

      setAutores(autoresData.autores || []);
      setServicios(serviciosData.servicios || []);
      setKeywords(keywordsData.keywords || []);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const loadNoticia = async () => {
    try {
      const res = await fetch(`/api/noticias/${params.id}`);
      const data = await res.json();
      
      if (data.noticia) {
        setFormData({
          ...data.noticia,
          keywords: data.noticia.keywords?.map(k => k.id_keyword) || [],
          fecha_publicacion: data.noticia.fecha_publicacion 
            ? new Date(data.noticia.fecha_publicacion).toISOString().slice(0, 16)
            : '',
        });
      }
    } catch (error) {
      console.error('Error al cargar noticia:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing ? `/api/noticias/${params.id}` : '/api/noticias';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/noticias');
      } else {
        setError(data.error || 'Error al guardar noticia');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordToggle = (keywordId) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.includes(keywordId)
        ? prev.keywords.filter(k => k !== keywordId)
        : [...prev.keywords, keywordId],
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {isEditing ? 'Editar Noticia' : 'Nueva Noticia'}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-800 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Código Único *
              </label>
              <input
                type="text"
                value={formData.cod_unico}
                onChange={(e) =>
                  setFormData({ ...formData, cod_unico: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                required
                disabled={isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Autor *
              </label>
              <select
                value={formData.id_autor}
                onChange={(e) =>
                  setFormData({ ...formData, id_autor: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                required
              >
                <option value="">Seleccionar autor</option>
                {autores.map((autor) => (
                  <option key={autor.id_autor} value={autor.id_autor}>
                    {autor.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                placeholder="Se genera automáticamente del título"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Servicio
              </label>
              <select
                value={formData.id_servicio}
                onChange={(e) =>
                  setFormData({ ...formData, id_servicio: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              >
                <option value="">Sin servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio.id_servicio} value={servicio.id_servicio}>
                    {servicio.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estado *
              </label>
              <select
                value={formData.estado}
                onChange={(e) =>
                  setFormData({ ...formData, estado: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                required
              >
                <option value="borrador">Borrador</option>
                <option value="publicada">Publicada</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fecha de Publicación
              </label>
              <input
                type="datetime-local"
                value={formData.fecha_publicacion}
                onChange={(e) =>
                  setFormData({ ...formData, fecha_publicacion: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contenido *
              </label>
              <textarea
                value={formData.contenido}
                onChange={(e) =>
                  setFormData({ ...formData, contenido: e.target.value })
                }
                rows="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                required
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keywords (SEO)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {keywords.map((keyword) => (
                  <label
                    key={keyword.id_keyword}
                    className="flex items-center space-x-2 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.keywords.includes(keyword.id_keyword)}
                      onChange={() => handleKeywordToggle(keyword.id_keyword)}
                      className="text-[#257CD0] focus:ring-[#257CD0]"
                    />
                    <span className="text-sm text-gray-700">{keyword.nombre}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/noticias')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#257CD0] text-white rounded-md hover:bg-[#1e6bb8] disabled:opacity-50"
          >
            {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}
