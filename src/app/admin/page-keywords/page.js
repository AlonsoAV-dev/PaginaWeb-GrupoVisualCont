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
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [keywordsSugeridas, setKeywordsSugeridas] = useState([]);
  const [generandoKeywords, setGenerandoKeywords] = useState(false);

  // Filtrar sugerencias basadas en búsqueda (excluir las ya seleccionadas)
  const filteredSuggestions = allKeywords
    .filter(k => 
      k.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedKeywordIds.includes(k.id_keyword)
    )
    .slice(0, 10); // Máximo 10 sugerencias

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

  const addKeyword = (keywordId) => {
    if (!selectedKeywordIds.includes(keywordId)) {
      setSelectedKeywordIds(prev => [...prev, keywordId]);
    }
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const removeKeyword = (keywordId) => {
    setSelectedKeywordIds(prev => prev.filter(id => id !== keywordId));
  };

  // Generar keywords con IA
  const generarKeywordsConIA = async () => {
    const currentPage = PAGES.find(p => p.id === selectedPage);
    if (!currentPage) return;

    // Prompts personalizados por página
    const pagePrompts = {
      home: {
        titulo: 'Visual - Software ERP Contable, Facturación y Planilla Electrónica Perú',
        contenido: 'ITS Business S.A.C., empresa peruana con más de 20 años en el mercado. Software ERP todo en uno que automatiza procesos empresariales. Soluciones principales: Sistema de Contabilidad con libros electrónicos PLE y SIRE SUNAT, integración API oficial SUNAT para facturación electrónica y SIRE 2025, Sistema de Facturación Electrónica (VisualFACT) con validación de comprobantes, Software de Planillas (VISUALPLAN) con cumplimiento SUNAFIL y firma electrónica, ERP Integrado (VisualInt) multiempresa. Certificaciones: PSE SUNAT, ISO 27001, AWS, Indecopi, Colegio de Contadores. Más de 8,000 clientes en Perú. Características: conexión API SUNAT, libros contables automáticos, exportación Excel, consulta RUC/DNI, software multiempresa, trabajo desde cualquier dispositivo. Sistema integrado para PYMES, manufactura, retail, restaurantes (VisualFOOD), distribuidoras. 15 días gratis de prueba.'
      },
      contable: {
        titulo: 'Software de Contabilidad - Sistema Contable Perú',
        contenido: 'Software contable completo para empresas en Perú. Libros electrónicos PLE y SIRE SUNAT, registro de compras y ventas, estados financieros, balance general, conciliación bancaria, asientos contables automatizados, integración con SUNAT.'
      },
      erp: {
        titulo: 'ERP Integrado - Sistema de Gestión Empresarial Perú',
        contenido: 'Sistema ERP todo en uno para empresas peruanas. Integra contabilidad, facturación, planillas, inventarios, compras, ventas, CRM. Gestión empresarial completa con reportes en tiempo real y dashboards ejecutivos.'
      },
      facturador: {
        titulo: 'Facturador Electrónico - Comprobantes Electrónicos SUNAT',
        contenido: 'Sistema de facturación electrónica homologado por SUNAT. Emite facturas, boletas, notas de crédito y débito electrónicas. PSE certificado, envío automático a SUNAT, firma digital, integración con sistemas contables.'
      },
      planilla: {
        titulo: 'Software de Planilla Electrónica - Gestión de RR.HH. Perú',
        contenido: 'Sistema de planilla electrónica completo. Cálculo de remuneraciones, AFP, ONP, CTS, gratificaciones, vacaciones. Generación de PDT PLAME, T-Registro, boletas de pago. Control de asistencia biométrico. Cumplimiento laboral tributario peruano.'
      },
      nosotros: {
        titulo: 'Nosotros - Grupo Visual CONT',
        contenido: 'Empresa peruana de desarrollo de software ERP contable con más de 15 años de experiencia. Especialistas en soluciones tecnológicas para contadores, empresas PYMES. Certificados por SUNAT como PSE. Soporte técnico especializado.'
      }
    };

    const pageData = pagePrompts[selectedPage] || {
      titulo: currentPage.name,
      contenido: `Página sobre ${currentPage.name}. Software contable en Perú.`
    };

    setGenerandoKeywords(true);
    setKeywordsSugeridas([]);
    
    try {
      const res = await fetch('/api/keywords/generar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
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
  const agregarKeywordSugerida = (sugerencia) => {
    // Buscar si ya existe
    let existingKeyword = allKeywords.find(
      k => k.nombre.toLowerCase() === sugerencia.toLowerCase()
    );

    if (existingKeyword) {
      addKeyword(existingKeyword.id_keyword);
      // Remover de sugerencias
      setKeywordsSugeridas(prev => prev.filter(s => s !== sugerencia));
      return;
    }

    // Si no existe, crear temporal (se creará en DB al guardar)
    const tempKeyword = {
      id_keyword: -(allKeywords.length + Math.random() * 1000),
      nombre: sugerencia,
    };

    setAllKeywords(prev => [...prev, tempKeyword]);
    setSelectedKeywordIds(prev => [...prev, tempKeyword.id_keyword]);
    setKeywordsSugeridas(prev => prev.filter(s => s !== sugerencia));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Convertir keywords: IDs positivos se mantienen, IDs negativos se convierten a nombres
      const keywordsToSend = selectedKeywordIds.map(kId => {
        if (kId > 0) {
          return kId; // ID existente
        } else {
          // ID temporal negativo, buscar el nombre
          const tempKeyword = allKeywords.find(k => k.id_keyword === kId);
          return tempKeyword ? tempKeyword.nombre : null;
        }
      }).filter(k => k !== null); // Filtrar nulls

      const res = await fetch('/api/pages/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: selectedPage,
          keywords: keywordsToSend,
        }),
      });

      if (res.ok) {
        alert('Keywords actualizadas correctamente');
        await loadAllKeywords(); // Recargar todas las keywords
        await loadPageKeywords(selectedPage);
        setKeywordsSugeridas([]); // Limpiar sugerencias
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
              onClick={generarKeywordsConIA}
              disabled={generandoKeywords}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {generandoKeywords ? '⏳ Generando...' : '✨ Generar con IA'}
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

        {/* Sugerencias de IA */}
        {keywordsSugeridas.length > 0 && (
          <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">
              💡 Sugerencias de IA ({keywordsSugeridas.length}):
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywordsSugeridas.map((sugerencia, index) => (
                <button
                  key={index}
                  onClick={() => agregarKeywordSugerida(sugerencia)}
                  className="px-3 py-1 bg-white dark:bg-gray-700 border border-purple-300 dark:border-purple-600 text-purple-900 dark:text-purple-200 rounded-full hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors text-sm"
                >
                  + {sugerencia}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keywords seleccionadas */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Keywords seleccionadas ({selectedKeywordIds.length}):
          </h3>
          {selectedKeywordIds.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm italic">
              No hay keywords seleccionadas. Usa el buscador para agregar.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {allKeywords
                .filter(k => selectedKeywordIds.includes(k.id_keyword))
                .map(keyword => (
                  <div
                    key={keyword.id_keyword}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    <span className="text-sm font-medium">{keyword.nombre}</span>
                    <button
                      onClick={() => removeKeyword(keyword.id_keyword)}
                      className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Buscador para agregar keywords */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Agregar keywords:
          </label>
          <input
            type="text"
            placeholder="Buscar keyword para agregar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#257CD0]"
          />

          {/* Dropdown de sugerencias */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredSuggestions.map(keyword => (
                <button
                  key={keyword.id_keyword}
                  onClick={() => addKeyword(keyword.id_keyword)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {keyword.nombre}
                </button>
              ))}
            </div>
          )}

          {/* Opción para crear nueva */}
          {searchTerm && filteredSuggestions.length === 0 && (
            <div className="mt-2">
              <button
                onClick={() => setShowKeywordModal(true)}
                className="text-sm text-[#257CD0] hover:underline"
              >
                + Crear nueva keyword "{searchTerm}"
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Total de keywords disponibles: {allKeywords.length}
        </p>
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
