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
  const [keywordInput, setKeywordInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [keywordsSugeridas, setKeywordsSugeridas] = useState([]);
  const [generandoKeywords, setGenerandoKeywords] = useState(false);

  useEffect(() => {
    loadData();
    if (isEditing) {
      loadNoticia();
    } else {
      // Si es una nueva noticia, cargar el usuario actual como autor
      loadCurrentUser();
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

  const loadCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.user && data.user.nombre) {
          // Rellenar el campo de autor con el nombre del usuario actual
          setFormData(prev => ({
            ...prev,
            nombre_autor: data.user.nombre
          }));
        }
      }
    } catch (error) {
      console.error('Error al cargar usuario actual:', error);
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

  const handleKeywordInput = async (e) => {
    const value = e.target.value;
    setKeywordInput(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeywordKeyDown = async (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      await addKeywordFromInput();
    }
  };

  const addKeywordFromInput = async () => {
    const keywordName = keywordInput.trim().replace(/,$/g, '');
    if (!keywordName) return;

    // Buscar si ya existe
    let existingKeyword = keywords.find(
      k => k.nombre.toLowerCase() === keywordName.toLowerCase()
    );

    // Si no existe, crearla
    if (!existingKeyword) {
      try {
        const res = await fetch('/api/keywords', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre: keywordName }),
        });

        const data = await res.json();
        if (res.ok) {
          existingKeyword = data.keyword;
          setKeywords(prev => [...prev, existingKeyword]);
        } else {
          alert(data.error || 'Error al crear keyword');
          return;
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión al crear keyword');
        return;
      }
    }

    // Agregar al formData si no está ya seleccionada
    if (!formData.keywords.includes(existingKeyword.id_keyword)) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, existingKeyword.id_keyword],
      }));
    }

    // Limpiar input
    setKeywordInput('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = async (keyword) => {
    // Agregar al formData si no está ya seleccionada
    if (!formData.keywords.includes(keyword.id_keyword)) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword.id_keyword],
      }));
    }

    // Limpiar input
    setKeywordInput('');
    setShowSuggestions(false);
  };

  const removeKeyword = (keywordId) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keywordId),
    }));
  };

  // Filtrar sugerencias basadas en el input
  const filteredSuggestions = keywords.filter(
    k => k.nombre.toLowerCase().includes(keywordInput.toLowerCase()) &&
         !formData.keywords.includes(k.id_keyword)
  ).slice(0, 5); // Máximo 5 sugerencias

  // Generar keywords con IA (Gemini)
  const generarKeywordsConIA = async () => {
    if (!formData.titulo && !formData.contenido) {
      alert('Escribe un título y contenido primero');
      return;
    }

    setGenerandoKeywords(true);
    try {
      const res = await fetch('/api/keywords/generar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: formData.titulo,
          contenido: formData.contenido,
        }),
      });

      const data = await res.json();

      if (res.ok && data.keywords) {
        setKeywordsSugeridas(data.keywords);
      } else {
        alert(data.error || 'Error al generar keywords');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión al generar keywords');
    } finally {
      setGenerandoKeywords(false);
    }
  };

  // Agregar keyword sugerida
  const agregarKeywordSugerida = async (sugerencia) => {
    // Buscar si ya existe
    let existingKeyword = keywords.find(
      k => k.nombre.toLowerCase() === sugerencia.toLowerCase()
    );

    // Si no existe, crearla
    if (!existingKeyword) {
      try {
        const res = await fetch('/api/keywords', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre: sugerencia }),
        });

        const data = await res.json();
        if (res.ok) {
          existingKeyword = data.keyword;
          setKeywords(prev => [...prev, existingKeyword]);
        } else {
          alert(data.error || 'Error al crear keyword');
          return;
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión al crear keyword');
        return;
      }
    }

    // Agregar al formData si no está ya seleccionada
    if (!formData.keywords.includes(existingKeyword.id_keyword)) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, existingKeyword.id_keyword],
      }));
    }
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

            <div className="md:col-span-2 mb-24">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Keywords (SEO)
                </label>
                <button
                  type="button"
                  onClick={generarKeywordsConIA}
                  disabled={generandoKeywords || (!formData.titulo && !formData.contenido)}
                  className="text-sm px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {generandoKeywords ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Generando...
                    </>
                  ) : (
                    <>
                      ✨ Generar con IA
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Escribe y presiona Enter o coma para agregar. Se crearán automáticamente si no existen.
              </p>

              {/* Keywords sugeridas por IA */}
              {keywordsSugeridas.length > 0 && (
                <div className="mb-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      ✨ Keywords sugeridas por IA:
                    </span>
                    <button
                      type="button"
                      onClick={() => setKeywordsSugeridas([])}
                      className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800"
                    >
                      Limpiar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {keywordsSugeridas.map((sugerencia, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => agregarKeywordSugerida(sugerencia)}
                        className="px-3 py-1.5 bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors border border-purple-300 dark:border-purple-700"
                      >
                        + {sugerencia}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Keywords seleccionadas (chips) */}
              {formData.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                  {formData.keywords.map((keywordId) => {
                    const keyword = keywords.find(k => k.id_keyword === keywordId);
                    if (!keyword) return null;
                    return (
                      <span
                        key={keywordId}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {keyword.nombre}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keywordId)}
                          className="hover:text-blue-600 dark:hover:text-blue-400 ml-1"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Input para agregar keywords */}
              <div className="relative mb-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={handleKeywordInput}
                  onKeyDown={handleKeywordKeyDown}
                  onFocus={() => setShowSuggestions(keywordInput.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  placeholder="Escribe una keyword y presiona Enter..."
                />
                
                {/* Sugerencias de autocompletado */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filteredSuggestions.map((keyword) => (
                      <button
                        key={keyword.id_keyword}
                        type="button"
                        onClick={() => handleSuggestionClick(keyword)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-gray-100"
                      >
                        {keyword.nombre}
                      </button>
                    ))}
                  </div>
                )}
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
