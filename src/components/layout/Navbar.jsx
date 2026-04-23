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

return ( <nav className="navbar"> <div className="container navbar-inner">
<Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}> <span className="navbar-logo-aiza">Aiza</span> <span className="navbar-logo-rest">Rest</span> </Link>

    <div className="desktop-nav">
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
      >
        <Icon name={theme === 'light' ? 'moon' : 'sun'} size={17} />
      </button>

      {user ? (
        <div style={{ position: 'relative' }}>
          <button onClick={() => setDropOpen(!dropOpen)} className="user-menu-btn">
            <div className="user-avatar">
              {user.avatar || user.name[0].toUpperCase()}
            </div>
            <span style={{ fontSize: 13 }}>{user.name.split(' ')[0]}</span>
            <Icon name={dropOpen ? 'chevron-up' : 'chevron-down'} size={14} />
          </button>

          {dropOpen && (
            <>
              <div
                style={{ position: 'fixed', inset: 0 }}
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
                    <Icon name={item.icon} size={16} />
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
        <div className="auth-buttons desktop-auth">
          <Link to="/login" className="btn btn-ghost">Войти</Link>
          <Link to="/register" className="btn btn-gold">Регистрация</Link>
        </div>
      )}

      <button
        className="burger-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="burger-line" />
        <span className="burger-line" />
        <span className="burger-line" />
      </button>
    </div>
  </div>

  {menuOpen && (
    <div className="mobile-menu">
      <NavLink to="/restaurants" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
        <Icon name="utensils" size={16} />
        Рестораны
      </NavLink>

      {user && (
        <>
          <NavLink to="/dashboard" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            <Icon name="clipboard" size={16} /> Кабинет
          </NavLink>
          <NavLink to="/favorites" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            <Icon name="heart" size={16} /> Избранное
          </NavLink>
          <NavLink to="/profile" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            <Icon name="user" size={16} /> Профиль
          </NavLink>
        </>
      )}

      {!user && (
        <div className="mobile-auth">
          <Link to="/login" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Войти</Link>
          <Link to="/register" className="btn btn-gold" onClick={() => setMenuOpen(false)}>Регистрация</Link>
        </div>
      )}

      {user && (
        <button onClick={handleLogout} className="mobile-menu-logout">
          <Icon name="logout" size={15} />
          Выйти
        </button>
      )}
    </div>
  )}
</nav>

);
}
