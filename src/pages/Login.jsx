import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/ui/Icon';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Введите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Некорректный email';
    if (!form.password) e.password = 'Введите пароль';
    else if (form.password.length < 6) e.password = 'Минимум 6 символов';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') setForm({ email: 'admin@aizarest.kg', password: 'admin123' });
    else setForm({ email: 'user@aizarest.kg', password: 'user123' });
    setErrors({});
  };

  return (
    <div className="auth-layout">
      <div className="auth-deco">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1550966871-3ed3cbe818b0?w=800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, marginBottom: 80 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff' }}>Aiza</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold)', fontStyle: 'italic' }}>Rest</span>
          </Link>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 24 }}>
            Добро пожаловать<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>обратно</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: 380 }}>
            Войдите в аккаунт, чтобы управлять бронированиями и получить доступ ко всем возможностям.
          </p>

          <div style={{ marginTop: 80, padding: '24px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Демо аккаунты</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Icon name="user" size={14} /></div>
                <div>
                  <p style={{ fontSize: 13, color: '#fff', fontWeight: 500, marginBottom: 2 }}>Пользователь</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>user@aizarest.kg / user123</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}><Icon name="shield" size={14} /></div>
                <div>
                  <p style={{ fontSize: 13, color: '#fff', fontWeight: 500, marginBottom: 2 }}>Администратор</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>admin@aizarest.kg / admin123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <Link to="/" style={{ position: 'absolute', top: 32, right: 40, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>
           На главную <Icon name="x" size={18} />
        </Link>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 400, marginBottom: 8, color: 'var(--text)' }}>Вход</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 40 }}>
            Нет аккаунта? <Link to="/register" style={{ color: 'var(--gold)', fontWeight: 500, marginLeft: 6 }}>Зарегистрироваться</Link>
          </p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            <button type="button" className="btn btn-outline" style={{ flex: 1, fontSize: 12.5, justifyContent: 'center', display: 'flex', gap: 8 }} onClick={() => fillDemo('user')}>
              <Icon name="user" size={15} /> Демо гость
            </button>
            <button type="button" className="btn btn-outline" style={{ flex: 1, fontSize: 12.5, justifyContent: 'center', display: 'flex', gap: 8 }} onClick={() => fillDemo('admin')}>
              <Icon name="shield" size={15} /> Демо админ
            </button>
          </div>

          <div style={{ position: 'relative', textAlign: 'center', marginBottom: 32 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)' }} />
            <span style={{ position: 'relative', background: 'var(--surface)', padding: '0 16px', fontSize: 12, color: 'var(--text-muted)' }}>или по Email</span>
          </div>

          {apiError && (
            <div style={{ background: 'var(--error-bg)', border: '1px solid rgba(231, 76, 60, 0.2)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 24, fontSize: 13.5, color: 'var(--error)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="alert-circle" size={18} />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="input-group">
              <label className="input-label">Электронная почта</label>
              <div style={{ position: 'relative' }}>
                <input type="email" className={`input-field ${errors.email ? 'error' : ''}`}
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  style={{ paddingLeft: 40 }} />
                <Icon name="mail" size={16} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
              </div>
              {errors.email && <p className="input-error">{errors.email}</p>}
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="input-label" style={{ marginBottom: 0 }}>Пароль</label>
                <Link to="#" style={{ fontSize: 12, color: 'var(--text-muted)' }}>Забыли пароль?</Link>
              </div>
              <div style={{ position: 'relative', marginTop: 6 }}>
                <input type="password" className={`input-field ${errors.password ? 'error' : ''}`}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  style={{ paddingLeft: 40 }} />
                <Icon name="lock" size={16} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
              </div>
              {errors.password && <p className="input-error">{errors.password}</p>}
            </div>

            <button type="submit" className="btn btn-gold" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: 12, padding: '15px', fontSize: 14 }}>
              {loading ? <><span className="btn-spinner" /> Вход...</> : 'Войти в аккаунт'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
