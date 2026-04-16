import { useState } from 'react';

export function usePagination(items, perPage = 10) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginated = items.slice(startIndex, endIndex);

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  return {
    page,
    setPage: goToPage,
    totalPages,
    paginated,
    hasPrev,
    hasNext,
    nextPage,
    prevPage,
  };
}
