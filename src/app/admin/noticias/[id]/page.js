'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const TinyMCEEditor = dynamic(() => import('@/components/admin/TinyMCEEditor'), {
  ssr: false,
  loading: () => <p>Cargando editor...</p>,
});

export default function NoticiaEditor() {
  const router = useRouter();
  const params = useParams();
  const isEditing = params?.id && params.id !== 'nueva';

  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    contenido: '',
    descripcion_corta: '',
    imagen_principal: '',
    id_categoria: '',
    nombre_autor: '',
    estado: 'borrador',
    keywords: [],
  });

  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
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
      const [autoresRes, categoriasRes, keywordsRes] = await Promise.all([
        fetch('/api/autores'),
        fetch('/api/categorias'),
        fetch('/api/keywords'),
      ]);

      const autoresData = await autoresRes.json();
      const categoriasData = await categoriasRes.json();
      const keywordsData = await keywordsRes.json();

      setAutores(autoresData.autores || []);
      setCategorias(categoriasData.categorias || []);
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
          titulo: data.noticia.titulo || '',
          slug: data.noticia.slug || '',
          contenido: data.noticia.contenido || '',
          descripcion_corta: data.noticia.descripcion_corta || '',
          imagen_principal: data.noticia.imagen_principal || '',
          id_categoria: data.noticia.id_categoria || '',
          nombre_autor: data.noticia.nombre_autor || '',
          estado: data.noticia.estado || 'borrador',
          keywords: data.noticia.keywords?.map(k => k.id_keyword) || [],
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
        // Forzar recarga completa de la página de noticias
        window.location.href = '/admin/noticias';
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
                Autor *
              </label>
              <input
                type="text"
                value={formData.nombre_autor}
                onChange={(e) =>
                  setFormData({ ...formData, nombre_autor: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                placeholder="Nombre del autor"
                required
              />
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
                Descripción Corta *
              </label>
              <textarea
                value={formData.descripcion_corta}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion_corta: e.target.value })
                }
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                placeholder="Descripción breve que aparecerá en las tarjetas de noticias"
                required
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Imagen Principal (URL)
              </label>
              <input
                type="text"
                value={formData.imagen_principal}
                onChange={(e) =>
                  setFormData({ ...formData, imagen_principal: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
              {formData.imagen_principal && (
                <div className="mt-2">
                  <img 
                    src={formData.imagen_principal} 
                    alt="Preview" 
                    className="h-32 object-cover rounded-md"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoría
              </label>
              <select
                value={formData.id_categoria}
                onChange={(e) =>
                  setFormData({ ...formData, id_categoria: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              >
                <option value="">Sin categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id_categoria} value={categoria.id_categoria}>
                    {categoria.nombre}
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
                Contenido *
              </label>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <TinyMCEEditor
                  value={formData.contenido}
                  onChange={(content) =>
                    setFormData({ ...formData, contenido: content })
                  }
                  height={500}
                />
              </div>
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
