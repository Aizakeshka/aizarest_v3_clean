import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../ui/Icon';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
    setDropOpen(false);
  };

  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  const userLinks = [
    { to: '/profile', icon: 'user', label: 'Профиль' },
    { to: '/dashboard', icon: 'clipboard', label: 'Мои брони' },
    { to: '/favorites', icon: 'heart', label: 'Избранное' },
    ...(isAdmin ? [{ to: '/admin', icon: 'shield', label: 'Панель управления' }] : []),
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span className="navbar-logo-aiza">Aiza</span>
          <span className="navbar-logo-rest">Rest</span>
        </Link>

        <div className="desktop-nav" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <NavLink to="/restaurants" className={navLinkClass}>Рестораны</NavLink>
          {user && (
            <>
              <NavLink to="/favorites" className={navLinkClass}>Избранное</NavLink>
              <NavLink to="/dashboard" className={navLinkClass}>Кабинет</NavLink>
            </>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>Панель</NavLink>
          )}
        </div>

        <div className="navbar-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} size={17} />
          </button>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setDropOpen(!dropOpen)} className="user-menu-btn">
                <div className="user-avatar">
                  {user.avatar || user.name[0].toUpperCase()}
                </div>
                <span style={{ fontSize: 13, fontWeight: 400 }}>{user.name.split(' ')[0]}</span>
                <Icon name={dropOpen ? 'chevron-up' : 'chevron-down'} size={14} style={{ color: 'var(--text-muted)' }} />
              </button>

              {dropOpen && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 199 }}
                    onClick={() => setDropOpen(false)}
                  />
                  <div className="dropdown">
                    {userLinks.map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="dropdown-item"
                        onClick={() => setDropOpen(false)}
                      >
                        <Icon name={item.icon} size={16} style={{ color: 'var(--text-muted)' }} />
                        {item.label}
                      </Link>
                    ))}
                    <div className="dropdown-divider">
                      <button onClick={handleLogout} className="dropdown-logout">
                        <Icon name="logout" size={16} />
                        Выйти
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="auth-buttons" style={{ display: 'flex', gap: 8 }}>
              <Link to="/login" className="btn btn-ghost" style={{ padding: '7px 18px', fontSize: 11 }}>Войти</Link>
              <Link to="/register" className="btn btn-gold" style={{ padding: '7px 18px', fontSize: 11 }}>Регистрация</Link>
            </div>
          )}

          <button
            className="burger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <NavLink
            to="/restaurants"
            className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="utensils" size={16} />
            Рестораны
          </NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                <Icon name="clipboard" size={16} /> Кабинет
              </NavLink>
              <NavLink to="/favorites" className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                <Icon name="heart" size={16} /> Избранное
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                <Icon name="user" size={16} /> Профиль
              </NavLink>
            </>
          )}

          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
              <Icon name="shield" size={16} /> Панель управления
            </NavLink>
          )}

          <div className="mobile-menu-footer">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
            >
              <Icon name={theme === 'light' ? 'moon' : 'sun'} size={17} />
            </button>

            {user ? (
              <button onClick={handleLogout} className="mobile-menu-logout">
                <Icon name="logout" size={15} />
                Выйти
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <Link to="/login" className="btn btn-ghost" style={{ fontSize: 12, padding: '7px 16px' }} onClick={() => setMenuOpen(false)}>Войти</Link>
                <Link to="/register" className="btn btn-gold" style={{ fontSize: 12, padding: '7px 16px' }} onClick={() => setMenuOpen(false)}>Регистрация</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
