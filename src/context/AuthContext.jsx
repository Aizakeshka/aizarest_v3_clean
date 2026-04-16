import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Built-in seed accounts (never deleted)
const SEED_USERS = [
  { id: 1, name: 'Администратор', email: 'admin@aizarest.kg', password: 'admin123', role: 'admin', phone: '+996 700 111 222', avatar: 'А', joined: '2023-01-15' },
  { id: 2, name: 'Айгуль Маматова', email: 'user@aizarest.kg', password: 'user123', role: 'user', phone: '+996 555 333 444', avatar: 'А', joined: '2023-06-20' },
];

// Load registered users from localStorage (persisted between sessions)
const loadRegistered = () => {
  try {
    const raw = localStorage.getItem('aizarest_registered_users');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const saveRegistered = (users) => {
  localStorage.setItem('aizarest_registered_users', JSON.stringify(users));
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // All users = seed + registered
  const [allUsers, setAllUsers] = useState(() => {
    const reg = loadRegistered();
    // Merge: seed emails take priority (avoid duplicates)
    const seedEmails = SEED_USERS.map(u => u.email);
    const filtered = reg.filter(u => !seedEmails.includes(u.email));
    return [...SEED_USERS, ...filtered];
  });

  useEffect(() => {
    const stored = localStorage.getItem('aizarest_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 800));
    const found = allUsers.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Неверный email или пароль');
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('aizarest_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const register = async (name, email, password, phone) => {
    await new Promise(r => setTimeout(r, 800));
    if (allUsers.find(u => u.email === email)) throw new Error('Email уже зарегистрирован');
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // stored so they can log back in
      role: 'user',
      phone,
      avatar: name[0].toUpperCase(),
      joined: new Date().toISOString().split('T')[0]
    };
    const updatedAll = [...allUsers, newUser];
    setAllUsers(updatedAll);
    // Persist only non-seed users
    const seedEmails = SEED_USERS.map(u => u.email);
    const toSave = updatedAll.filter(u => !seedEmails.includes(u.email));
    saveRegistered(toSave);

    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('aizarest_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aizarest_user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('aizarest_user', JSON.stringify(updated));
    // Also update allUsers
    const updatedAll = allUsers.map(u => u.id === updated.id ? { ...u, ...updates } : u);
    setAllUsers(updatedAll);
    const seedEmails = SEED_USERS.map(u => u.email);
    saveRegistered(updatedAll.filter(u => !seedEmails.includes(u.email)));
  };

  // Admin: get all users without passwords
  const getUsers = () => allUsers.map(({ password: _, ...u }) => u);

  const deleteUser = (id) => {
    const updated = allUsers.filter(u => u.id !== id);
    setAllUsers(updated);
    const seedEmails = SEED_USERS.map(u => u.email);
    saveRegistered(updated.filter(u => !seedEmails.includes(u.email)));
  };

  const updateUserRole = (id, role) => {
    const updated = allUsers.map(u => u.id === id ? { ...u, role } : u);
    setAllUsers(updated);
    const seedEmails = SEED_USERS.map(u => u.email);
    saveRegistered(updated.filter(u => !seedEmails.includes(u.email)));
  };

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout, updateProfile,
      isAdmin: user?.role === 'admin',
      getUsers, deleteUser, updateUserRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
