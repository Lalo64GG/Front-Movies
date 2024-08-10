type PagNavigationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number; // Agrega el número total de páginas si es necesario
};

export const PagNavigation = ({ page, setPage, totalPages }: PagNavigationProps) => {
  // Número de páginas a mostrar por bloque
  const pagesPerBlock = 5;
  // Calcular el bloque actual
  const currentBlockStart = Math.floor((page - 1) / pagesPerBlock) * pagesPerBlock + 1;
  const currentBlockEnd = Math.min(currentBlockStart + pagesPerBlock - 1, totalPages);

  // Generar números de página para el bloque actual
  const pageNumbers = Array.from(
    { length: currentBlockEnd - currentBlockStart + 1 },
    (_, i) => currentBlockStart + i
  );

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="flex items-center flex-wrap">
      {/* Botón de bloque anterior */}
      <button
        onClick={() => setPage(Math.max(currentBlockStart - pagesPerBlock, 1))}
        disabled={page <= pagesPerBlock}
        className="bg-blue-500 text-white px-4 py-2 rounded mx-1 mb-2 text-sm sm:text-base"
      >
        &lt;&lt;
      </button>

      {/* Números de página */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => handlePageClick(number)}
          className={`px-4 py-2 mx-1 mb-2 rounded text-sm sm:text-base ${number === page ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {number}
        </button>
      ))}

      {/* Botón de bloque siguiente */}
      <button
        onClick={() => setPage(Math.min(currentBlockStart + pagesPerBlock, totalPages))}
        disabled={page >= totalPages}
        className="bg-blue-500 text-white px-4 py-2 rounded mx-1 mb-2 text-sm sm:text-base"
      >
        &gt;&gt;
      </button>
    </div>
  );
};
