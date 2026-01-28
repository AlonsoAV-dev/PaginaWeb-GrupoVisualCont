'use client';
import { useEffect, useState } from 'react';

const PAGES = [
  { id: 'home', name: 'Página de Inicio', path: '/' },
  { id: 'contable', name: 'Software Contable', path: '/contable' },
  { id: 'erp', name: 'ERP Integrado', path: '/erp' },
  { id: 'facturador', name: 'Facturador Electrónico', path: '/facturador' },
  { id: 'planilla', name: 'Planilla Electrónica', path: '/planilla' },
  { id: 'nosotros', name: 'Nosotros', path: '/nosotros' },
];

export default function PageKeywordsAdmin() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [allKeywords, setAllKeywords] = useState([]);
  const [pageKeywords, setPageKeywords] = useState([]);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showKeywordModal, setShowKeywordModal] = useState(false);
  const [newKeywordName, setNewKeywordName] = useState('');
  const [creatingKeyword, setCreatingKeyword] = useState(false);

  useEffect(() => {
    loadAllKeywords();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      loadPageKeywords(selectedPage);
    }
  }, [selectedPage]);

  const loadAllKeywords = async () => {
    try {
      const res = await fetch('/api/keywords');
      const data = await res.json();
      setAllKeywords(data.keywords || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPageKeywords = async (page) => {
    try {
      const res = await fetch(`/api/pages/keywords?page=${page}`);
      const data = await res.json();
      setPageKeywords(data.keywords || []);
      setSelectedKeywordIds(data.keywords?.map(k => k.id_keyword) || []);
    } catch (error) {
      console.error('Error:', error);
      setPageKeywords([]);
      setSelectedKeywordIds([]);
    }
  };

  const handleKeywordToggle = (keywordId) => {
    setSelectedKeywordIds(prev =>
      prev.includes(keywordId)
        ? prev.filter(id => id !== keywordId)
        : [...prev, keywordId]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/pages/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: selectedPage,
          keywords: selectedKeywordIds,
        }),
      });

      if (res.ok) {
        alert('Keywords actualizadas correctamente');
        loadPageKeywords(selectedPage);
      } else {
        const data = await res.json();
        alert(data.error || 'Error al guardar');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleCreateKeyword = async (e) => {
    e.preventDefault();
    if (!newKeywordName.trim()) return;

    setCreatingKeyword(true);
    try {
      const res = await fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: newKeywordName.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        // Agregar la nueva keyword a la lista
        setAllKeywords(prev => [...prev, data.keyword]);
        // Seleccionar automáticamente la nueva keyword
        setSelectedKeywordIds(prev => [...prev, data.keyword.id_keyword]);
        // Limpiar y cerrar modal
        setNewKeywordName('');
        setShowKeywordModal(false);
        alert('Keyword creada y agregada correctamente');
      } else {
        alert(data.error || 'Error al crear keyword');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión al crear keyword');
    } finally {
      setCreatingKeyword(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  const currentPage = PAGES.find(p => p.id === selectedPage);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Keywords por Página (SEO)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Asigna keywords específicas a cada página para mejorar el SEO
        </p>
      </div>

      {/* Selector de página */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Selecciona una página:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => setSelectedPage(page.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedPage === page.id
                  ? 'border-[#257CD0] bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900 dark:text-white">
                {page.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {page.path}
              </div>
              {selectedPage === page.id && (
                <div className="text-xs text-[#257CD0] mt-2">
                  {selectedKeywordIds.length} keywords seleccionadas
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords disponibles */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Keywords para: {currentPage?.name}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowKeywordModal(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              + Nueva Keyword
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-[#257CD0] text-white rounded-md hover:bg-[#1e6bb8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>

        {allKeywords.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No hay keywords disponibles. Crea algunas en la sección de Keywords.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allKeywords.map((keyword) => (
              <label
                key={keyword.id_keyword}
                className={`flex items-center space-x-2 p-3 border-2 rounded-md cursor-pointer transition-all ${
                  selectedKeywordIds.includes(keyword.id_keyword)
                    ? 'border-[#257CD0] bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedKeywordIds.includes(keyword.id_keyword)}
                  onChange={() => handleKeywordToggle(keyword.id_keyword)}
                  className="text-[#257CD0] focus:ring-[#257CD0] w-5 h-5"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {keyword.nombre}
                </span>
              </label>
            ))}
          </div>
        )}

        {selectedKeywordIds.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Keywords seleccionadas ({selectedKeywordIds.length}):
            </h3>
            <div className="flex flex-wrap gap-2">
              {allKeywords
                .filter(k => selectedKeywordIds.includes(k.id_keyword))
                .map(keyword => (
                  <span
                    key={keyword.id_keyword}
                    className="px-3 py-1 bg-[#257CD0] text-white text-sm rounded-full"
                  >
                    {keyword.nombre}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          💡 ¿Cómo funcionan las keywords por página?
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
          <li>• Se integran automáticamente en el metadata de la página</li>
          <li>• Mejoran el ranking en búsquedas específicas de Google</li>
          <li>• Se agregan al Schema.org JSON-LD para SEO avanzado</li>
          <li>• Recomendado: 5-8 keywords por página</li>
        </ul>
      </div>

      {/* Modal para crear keyword */}
      {showKeywordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Nueva Keyword
            </h2>
            <form onSubmit={handleCreateKeyword}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre de la Keyword
                </label>
                <input
                  type="text"
                  value={newKeywordName}
                  onChange={(e) => setNewKeywordName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  placeholder="Ej: facturación electrónica"
                  required
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowKeywordModal(false);
                    setNewKeywordName('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={creatingKeyword}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creatingKeyword}
                  className="px-4 py-2 bg-[#257CD0] text-white rounded-md hover:bg-[#1e6bb8] disabled:opacity-50"
                >
                  {creatingKeyword ? 'Creando...' : 'Crear y Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
