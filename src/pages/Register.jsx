import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from '../components/ui/Icon';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Минимум 2 символа';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Некорректный email';
    if (!form.phone) e.phone = 'Укажите номер';
    if (!form.password || form.password.length < 6) e.password = 'Минимум 6 символов';
    if (form.password !== form.confirm) e.confirm = 'Пароли не совпадают';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setApiError('');
    
    try {
      await register(form.name, form.email, form.password, form.phone);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-deco">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, marginBottom: 80 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff' }}>Aiza</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold)', fontStyle: 'italic' }}>Rest</span>
          </Link>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 24 }}>
            Создайте<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>свой аккаунт</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: 380 }}>
            Зарегистрируйтесь, чтобы получить доступ к эксклюзивным функциям и управлять своими бронированиями.
          </p>
        </div>
      </div>

      <div className="auth-form-side">
        <Link to="/" style={{ position: 'absolute', top: 32, right: 40, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13, textDecoration: 'none' }}>
           На главную <Icon name="x" size={18} />
        </Link>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 400, marginBottom: 8, color: 'var(--text)' }}>Регистрация</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 40 }}>
            Уже есть аккаунт? <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 500, marginLeft: 6 }}>Войти</Link>
          </p>

          {apiError && (
            <div style={{ background: 'var(--error-bg)', border: '1px solid rgba(231, 76, 60, 0.2)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 24, fontSize: 13.5, color: 'var(--error)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="alert-circle" size={18} />
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="input-group">
              <label className="input-label">Имя и фамилия</label>
              <div style={{ position: 'relative' }}>
                <input type="text" className={`input-field ${errors.name ? 'error' : ''}`}
                  placeholder="Айгуль Маматова"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={{ paddingLeft: 40 }} />
                <Icon name="user" size={16} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
              </div>
              {errors.name && <p className="input-error">{errors.name}</p>}
            </div>

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
              <label className="input-label">Номер телефона</label>
              <div style={{ position: 'relative' }}>
                <input type="tel" className={`input-field ${errors.phone ? 'error' : ''}`}
                  placeholder="+996 700 123 456"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  style={{ paddingLeft: 40 }} />
                <Icon name="phone" size={16} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
              </div>
              {errors.phone && <p className="input-error">{errors.phone}</p>}
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Пароль</label>
                <div style={{ position: 'relative' }}>
                  <input type="password" className={`input-field ${errors.password ? 'error' : ''}`}
                    placeholder="Минимум 6 симв."
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    style={{ paddingLeft: 40 }} />
                  <Icon name="lock" size={16} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
                </div>
                {errors.password && <p className="input-error">{errors.password}</p>}
              </div>

              <div className="input-group">
                <label className="input-label">Подтвердите</label>
                <div style={{ position: 'relative' }}>
                  <input type="password" className={`input-field ${errors.confirm ? 'error' : ''}`}
                    placeholder="Повторите"
                    value={form.confirm}
                    onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))} />
                </div>
                {errors.confirm && <p className="input-error">{errors.confirm}</p>}
              </div>
            </div>

            <button type="submit" className="btn btn-gold" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: 12, padding: '15px', fontSize: 14 }}>
              {loading ? <><span className="btn-spinner" /> Создание...</> : 'Создать аккаунт'}
            </button>

            <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6, marginTop: 8 }}>
              Регистрируясь, вы соглашаетесь с <span style={{ color: 'var(--gold)' }}>условиями использования</span> платформы и <span style={{ color: 'var(--gold)' }}>политикой конфиденциальности</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
