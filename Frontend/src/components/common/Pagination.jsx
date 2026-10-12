import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 0,
  totalPages = 1,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxButtons = 5;
  let startPage = Math.max(0, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(0, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        aria-label="Trang trước"
        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {startPage > 0 && (
        <>
          <button
            onClick={() => onPageChange(0)}
            className={`w-9 h-9 text-sm rounded-lg border transition-colors ${
              currentPage === 0
                ? 'bg-emerald-600 border-emerald-600 text-white font-semibold'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            1
          </button>
          {startPage > 1 && <span className="px-1 text-gray-400">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 text-sm rounded-lg border transition-colors ${
            currentPage === p
              ? 'bg-emerald-600 border-emerald-600 text-white font-semibold shadow-sm shadow-emerald-200'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {p + 1}
        </button>
      ))}

      {endPage < totalPages - 1 && (
        <>
          {endPage < totalPages - 2 && <span className="px-1 text-gray-400">...</span>}
          <button
            onClick={() => onPageChange(totalPages - 1)}
            className={`w-9 h-9 text-sm rounded-lg border transition-colors ${
              currentPage === totalPages - 1
                ? 'bg-emerald-600 border-emerald-600 text-white font-semibold'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        aria-label="Trang sau"
        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
