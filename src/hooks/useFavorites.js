import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('lol_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lol_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === item.id)) {
        return prev.filter(fav => fav.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  return { favorites, isFavorite, toggleFavorite };
}