import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import Icon from '../components/ui/Icon';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { bookings, showToast } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '' });
  const [errors, setErrors] = useState({});

  const myBookings = bookings.filter(b => b.userId === user?.id);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Минимум 2 символа';
    if (!form.phone) e.phone = 'Укажите номер телефона';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateProfile({ name: form.name, phone: form.phone });
    setEditing(false);
    showToast('Профиль обновлён!');
  };

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      <div className="page-header" style={{ paddingBottom: 64 }}>
        <div className="container">
          <p className="page-header-label">Аккаунт</p>
          <h1 className="page-header-title">Профиль</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '0 24px 64px', maxWidth: 800, marginTop: -40 }}>
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow)', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div style={{ background: 'var(--surface)', padding: '40px', display: 'flex', alignItems: 'center', gap: 24, borderBottom: '1px solid var(--border)' }}>
            <div style={{
              width: 88, height: 88, borderRadius: '50%', background: 'var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, color: '#fff', fontFamily: 'var(--font-display)',
            }}>{user?.avatar || user?.name?.[0]}</div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text)', fontWeight: 400, marginBottom: 8 }}>{user?.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-muted)' }}>
                <Icon name={user?.role === 'admin' ? 'shield' : 'user'} size={15} style={{ color: user?.role === 'admin' ? 'var(--gold)' : 'inherit' }} />
                {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, opacity: 0.8 }}>Участник с {user?.joined}</p>
            </div>
          </div>

          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text)' }}>Личные данные</h3>
              {!editing
                ? <button className="btn btn-ghost" style={{ fontSize: 13, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => setEditing(true)}>
                    <Icon name="edit-2" size={14} /> Редактировать
                  </button>
                : <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }} onClick={() => { setEditing(false); setErrors({}); }}>Отмена</button>
                    <button className="btn btn-gold" style={{ fontSize: 12, padding: '8px 16px' }} onClick={handleSave}>Сохранить</button>
                  </div>
              }
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Имя и фамилия</label>
                {editing
                  ? <><input className={`input-field ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                      {errors.name && <p className="input-error">{errors.name}</p>}</>
                  : <p style={{ fontSize: 15, paddingTop: 10, color: 'var(--text)' }}>{user?.name}</p>
                }
              </div>
              <div className="input-group">
                <label className="input-label">Email <span style={{ opacity: 0.5, fontSize: 11, fontWeight: 400 }}>(нельзя изменить)</span></label>
                <p style={{ fontSize: 15, paddingTop: 10, color: 'var(--text)' }}>{user?.email}</p>
              </div>
              <div className="input-group">
                <label className="input-label">Телефон</label>
                {editing
                  ? <><input className={`input-field ${errors.phone ? 'error' : ''}`} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                      {errors.phone && <p className="input-error">{errors.phone}</p>}</>
                  : <p style={{ fontSize: 15, paddingTop: 10, color: 'var(--text)' }}>{user?.phone || '—'}</p>
                }
              </div>
              <div className="input-group">
                <label className="input-label">Статус аккаунта</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10 }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
                  <span style={{ fontSize: 15, color: 'var(--text)' }}>Активен</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ display: 'flex', gap: 40 }}>
              {[
                { label: 'Броней', value: myBookings.length, icon: 'clipboard' },
                { label: 'Завершено', value: myBookings.filter(b => b.status === 'completed').length, icon: 'check-circle' },
                { label: 'Отменено', value: myBookings.filter(b => b.status === 'cancelled').length, icon: 'x-circle' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', border: '1px solid var(--border)' }}>
                    <Icon name={s.icon} size={20} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-danger" style={{ fontSize: 12.5, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8 }} onClick={logout}>
              <Icon name="logout" size={16} /> Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
