import { useState, useEffect } from 'react';

const LS_KEY = 'aizarest_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
