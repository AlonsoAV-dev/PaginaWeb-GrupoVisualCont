"use client";

import { useState, useMemo } from "react";
import { getFilteredAndPaginatedNotices } from "../../../lib/utils";

function usePagination(category, searchTerm) {
  const [currentPage, setCurrentPage] = useState(1);

  const { notices, pagination } = useMemo(() => {
    const result = getFilteredAndPaginatedNotices(category, currentPage, searchTerm);
    return result;
  }, [category, currentPage, searchTerm]);

  // Reset a página 1 cuando cambian los filtros
  const handleFiltersChange = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll suave al inicio de la lista
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    notices,
    pagination,
    currentPage,
    handlePageChange,
    handleFiltersChange
  };
}

export default usePagination;