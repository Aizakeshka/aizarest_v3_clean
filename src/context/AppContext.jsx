import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { RESTAURANTS, generateBookings } from '../utils/data';

const AppContext = createContext(null);

const LS_RESTAURANTS = 'aizarest_restaurants';
const LS_BOOKINGS = 'aizarest_bookings';

const loadFromLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return fallback;
};

export function AppProvider({ children }) {
  const [restaurants, setRestaurants] = useState(() =>
    loadFromLS(LS_RESTAURANTS, RESTAURANTS)
  );
  const [bookings, setBookings] = useState(() =>
    loadFromLS(LS_BOOKINGS, generateBookings())
  );
  const [toast, setToast] = useState(null);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    try { localStorage.setItem(LS_RESTAURANTS, JSON.stringify(restaurants)); } catch {}
  }, [restaurants]);

  useEffect(() => {
    try { localStorage.setItem(LS_BOOKINGS, JSON.stringify(bookings)); } catch {}
  }, [bookings]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const addBooking = useCallback((data) => {
    const newBooking = { ...data, id: Date.now(), status: data.status || 'pending' };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  }, []);

  const updateBooking = useCallback((id, updates) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  }, []);

  const deleteBooking = useCallback((id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  }, []);

  const addRestaurant = useCallback((data) => {
    const newR = { ...data, id: Date.now(), rating: 4.5, bookings: 0, status: 'active', menu: data.menu || [] };
    setRestaurants(prev => [...prev, newR]);
    return newR;
  }, []);

  const updateRestaurant = useCallback((id, updates) => {
    setRestaurants(prev =>
      prev.map(r => r.id === id ? { ...r, ...updates, id } : r)
    );
  }, []);

  const deleteRestaurant = useCallback((id) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
    setBookings(prev => prev.filter(b => b.restaurantId !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      restaurants, bookings, toast, showToast,
      addBooking, updateBooking, deleteBooking,
      addRestaurant, updateRestaurant, deleteRestaurant,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
