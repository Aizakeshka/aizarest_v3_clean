import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import Icon from '../components/ui/Icon';

const STATUS_LABELS = {
  confirmed: 'Подтверждено',
  pending: 'Ожидает',
  cancelled: 'Отменено',
  completed: 'Завершено',
};

const STATUS_BADGE = {
  confirmed: 'badge-green',
  pending: 'badge-gold',
  cancelled: 'badge-red',
  completed: 'badge-gray',
};

const FILTERS = [
  { val: 'all', label: 'Все' },
  { val: 'pending', label: 'Ожидают' },
  { val: 'confirmed', label: 'Подтверждены' },
  { val: 'completed', label: 'Завершены' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { bookings, updateBooking, showToast } = useApp();
  const [filter, setFilter] = useState('all');
  const [cancelId, setCancelId] = useState(null);
  const [cancelBooking, setCancelBooking] = useState(null);

  const myBookings = bookings.filter(b => b.userId === user?.id);
  const filtered = filter === 'all' ? myBookings : myBookings.filter(b => b.status === filter);

  const stats = [
    { icon: 'clipboard', label: 'Всего броней', value: myBookings.length },
    { icon: 'check-circle', label: 'Подтверждено', value: myBookings.filter(b => b.status === 'confirmed').length },
    { icon: 'clock', label: 'Ожидают', value: myBookings.filter(b => b.status === 'pending').length },
    {
      icon: 'wallet',
      label: 'Потрачено',
      value: myBookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.totalAmount, 0).toLocaleString() + ' сом',
    },
  ];

  const handleCancel = () => {
    updateBooking(cancelId, { status: 'cancelled' });
    setCancelId(null);
    setCancelBooking(null);
    showToast('Бронирование отменено');
  };

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      <div className="page-header">
        <div className="container">
          <p className="page-header-label">Личный кабинет</p>
          <h1 className="page-header-title" style={{ marginBottom: 6 }}>
            Здравствуйте, {user?.name?.split(' ')[0]}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Управление вашими бронированиями</p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        <div className="grid-4" style={{ marginBottom: 40 }}>
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-card-icon">
                <Icon name={s.icon} size={22} />
              </div>
              <p className="stat-card-value">{s.value}</p>
              <p className="stat-card-label">{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text)' }}>Мои бронирования</h2>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {FILTERS.map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => setFilter(val)}
                  style={{
                    padding: '5px 14px',
                    fontSize: 11.5,
                    letterSpacing: 0.5,
                    borderRadius: 20,
                    cursor: 'pointer',
                    background: filter === val ? 'var(--gold)' : 'transparent',
                    color: filter === val ? '#fff' : 'var(--text-muted)',
                    border: `1px solid ${filter === val ? 'var(--gold)' : 'var(--border)'}`,
                    transition: 'var(--transition)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="utensils"
              title="Бронирований нет"
              text="Забронируйте столик в любимом ресторане"
              action={<Link to="/restaurants" className="btn btn-gold">Выбрать ресторан</Link>}
            />
          ) : (
            <div>
              {filtered.map((b, idx) => (
                <div
                  key={b.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 16,
                    padding: '20px 24px',
                    borderBottom: idx < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                      <h3 style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)' }}>{b.restaurantName}</h3>
                      <span className={`badge ${STATUS_BADGE[b.status]}`}>
                        {STATUS_LABELS[b.status]}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-muted)' }}>
                        <Icon name="calendar" size={13} /> {b.date} · {b.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--text-muted)' }}>
                        <Icon name="users" size={13} /> {b.guests} {b.guests === 1 ? 'гость' : 'гостей'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
                        <Icon name="wallet" size={13} /> {b.totalAmount?.toLocaleString()} сом
                      </span>
                    </div>
                    {b.comment && (
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>{b.comment}</p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Link
                      to={`/restaurants/${b.restaurantId}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--gold)', whiteSpace: 'nowrap' }}
                    >
                      Ресторан <Icon name="arrow-right" size={14} />
                    </Link>
                    {(b.status === 'pending' || b.status === 'confirmed') && (
                      <button
                        onClick={() => { setCancelId(b.id); setCancelBooking(b); }}
                        className="btn btn-ghost"
                        style={{ fontSize: 11, padding: '5px 12px' }}
                      >
                        Отменить
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {cancelId && (
        <ConfirmModal
          title="Отменить бронирование?"
          text={
            cancelBooking?.status === 'confirmed'
              ? 'Это бронирование уже подтверждено. Вы уверены, что хотите его отменить?'
              : 'Это действие необратимо. Вы уверены, что хотите отменить бронирование?'
          }
          confirmLabel="Да, отменить"
          onConfirm={handleCancel}
          onCancel={() => { setCancelId(null); setCancelBooking(null); }}
        />
      )}
    </div>
  );
}
