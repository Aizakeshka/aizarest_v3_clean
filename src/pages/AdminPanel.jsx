import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import Select from '../components/ui/Select';
import Icon from '../components/ui/Icon';
import { usePagination } from '../hooks/usePagination';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const STATUS_LABELS = { confirmed: 'Подтверждено', pending: 'Ожидает', cancelled: 'Отменено', completed: 'Завершено' };
const STATUS_BADGE = { confirmed: 'badge-green', pending: 'badge-gold', cancelled: 'badge-red', completed: 'badge-gray' };

const TABS = ['Обзор', 'Рестораны', 'Бронирования', 'Пользователи'];

export default function AdminPanel() {
  const { restaurants, bookings, updateBooking, deleteBooking, deleteRestaurant, showToast } = useApp();
  const { getUsers, deleteUser, updateUserRole } = useAuth();
  const [tab, setTab] = useState('Обзор');
  const [deleteRestId, setDeleteRestId] = useState(null);
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [bookSearch, setBookSearch] = useState('');
  const [bookStatus, setBookStatus] = useState('all');
  const [userSearch, setUserSearch] = useState('');
  const [userRole, setUserRole] = useState('all');

  const users = getUsers();

  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.totalAmount, 0);
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'];
  const chartData = months.map((m, i) => ({
    name: m,
    брони: Math.floor(30 + i * 8 + Math.sin(i) * 10),
    выручка: Math.floor(120000 + i * 30000 + Math.cos(i) * 20000),
  }));

  const filteredBookings = bookings.filter(b => {
    const matchSearch = !bookSearch || b.restaurantName.toLowerCase().includes(bookSearch.toLowerCase()) || b.guestName.toLowerCase().includes(bookSearch.toLowerCase());
    const matchStatus = bookStatus === 'all' || b.status === bookStatus;
    return matchSearch && matchStatus;
  });

  const filteredUsers = users.filter(u => {
    const matchSearch = !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = userRole === 'all' || u.role === userRole;
    return matchSearch && matchRole;
  });

  const {
    page: bookPage, setPage: setBookPage, totalPages: bookTotalPages,
    paginated: paginatedBookings, hasPrev: bookHasPrev, hasNext: bookHasNext,
    nextPage: bookNextPage, prevPage: bookPrevPage,
  } = usePagination(filteredBookings, 10);

  useEffect(() => { setBookPage(1); }, [bookSearch, bookStatus, setBookPage]);

  const handleDeleteRest = () => { deleteRestaurant(deleteRestId); setDeleteRestId(null); showToast('Ресторан удалён'); };
  const handleDeleteBook = () => { deleteBooking(deleteBookId); setDeleteBookId(null); showToast('Бронирование удалено'); };
  const handleDeleteUser = () => { deleteUser(deleteUserId); setDeleteUserId(null); showToast('Пользователь удалён'); };
  const handleStatusChange = (id, status) => { updateBooking(id, { status }); showToast('Статус обновлён'); };
  const handleRoleChange = (id, role) => { updateUserRole(id, role); showToast('Роль обновлена'); };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="page-header" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p className="page-header-label">Панель управления</p>
              <h1 className="page-header-title">Admin Panel</h1>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link to="/restaurants/create" className="btn btn-gold" style={{ fontSize: 12 }}>+ Добавить ресторан</Link>
              <Link to="/bookings/create" className="btn btn-outline" style={{ fontSize: 12 }}>+ Новая бронь</Link>
            </div>
          </div>
          <div className="tab-bar">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab === t ? 'active' : ''}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {/* OVERVIEW */}
        {tab === 'Обзор' && (
          <div className="fade-in">
            <div className="grid-4" style={{ marginBottom: 40 }}>
              {[
                { icon: 'home', label: 'Ресторанов', value: restaurants.length, sub: 'активных' },
                { icon: 'clipboard', label: 'Бронирований', value: bookings.length, sub: 'всего' },
                { icon: 'check-circle', label: 'Подтверждено', value: confirmedCount, sub: 'броней' },
                { icon: 'users', label: 'Пользователей', value: users.length, sub: 'зарегистрировано' },
                { icon: 'clock', label: 'Ожидают', value: pendingCount, sub: 'обработки' },
                { icon: 'wallet', label: 'Выручка', value: (totalRevenue / 1000).toFixed(0) + 'K', sub: 'сом' },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-card-icon"><Icon name={s.icon} size={24} /></div>
                  <p className="stat-card-value">{s.value}</p>
                  <p className="stat-card-label">{s.label} · {s.sub}</p>
                </div>
              ))}
            </div>

            <div className="admin-charts-grid" style={{ marginBottom: 40 }}>
              <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, marginBottom: 24, color: 'var(--text)' }}>Брони по месяцам</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} />
                    <Line type="monotone" dataKey="брони" stroke="#C9A84C" strokeWidth={3} dot={{ fill: '#C9A84C', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: '28px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, marginBottom: 24, color: 'var(--text)' }}>Выручка (тыс. сом)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      formatter={v => [(v/1000).toFixed(0) + 'K сом']} 
                      contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)' }} 
                    />
                    <Bar dataKey="выручка" fill="#C9A84C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text)' }}>Последние бронирования</h3>
                <button onClick={() => setTab('Бронирования')} style={{ fontSize: 12, color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Все →</button>
              </div>
              <div className="table-wrapper">
                <table>
                  <thead><tr><th>Гость</th><th>Ресторан</th><th>Дата</th><th>Статус</th><th>Сумма</th></tr></thead>
                  <tbody>
                    {bookings.slice(0, 6).map(b => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 400 }}>{b.guestName}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.restaurantName}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.date} {b.time}</td>
                        <td><span className={`badge ${STATUS_BADGE[b.status]}`}>{STATUS_LABELS[b.status]}</span></td>
                        <td style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold)' }}>{b.totalAmount?.toLocaleString()} сом</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* RESTAURANTS */}
        {tab === 'Рестораны' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
              <Link to="/restaurants/create" className="btn btn-gold" style={{ fontSize: 12 }}>+ Добавить ресторан</Link>
            </div>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Ресторан</th><th>Кухня</th><th>Адрес</th><th>Цена от</th><th>Рейтинг</th><th>Брони</th><th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurants.map(r => (
                      <tr key={r.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <img src={r.image} alt="" style={{ width: 48, height: 48, borderRadius: 'var(--radius)', objectFit: 'cover' }} />
                            <span style={{ fontWeight: 500, fontSize: 14 }}>{r.name}</span>
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{r.cuisine}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 12, maxWidth: 160 }}>{r.address}</td>
                        <td style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.2rem' }}>
                          {r.menu && r.menu.length
                            ? Math.min(...r.menu.map(m => m.price || r.pricePerDish)).toLocaleString()
                            : r.pricePerDish?.toLocaleString()} сом
                        </td>
                        <td><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="star" size={14} style={{ color: 'var(--gold)' }} /> {r.rating}</div></td>
                        <td style={{ color: 'var(--text-muted)' }}>{r.bookings || bookings.filter(b => b.restaurantId === r.id).length}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <Link to={`/restaurants/${r.id}/edit`} className="btn btn-ghost" style={{ fontSize: 11, padding: '6px 12px' }}>Ред.</Link>
                            <button onClick={() => setDeleteRestId(r.id)} className="btn btn-danger" style={{ fontSize: 11, padding: '6px 12px' }}>Удал.</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS */}
        {tab === 'Бронирования' && (
          <div className="fade-in">
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
                <input className="input-field" placeholder="Поиск по гостю или ресторану..."
                  value={bookSearch} onChange={e => setBookSearch(e.target.value)}
                  style={{ fontSize: 13, paddingLeft: 36 }} />
                <Icon name="search" size={16} style={{ position: 'absolute', left: 12, top: 13, color: 'var(--gray)', pointerEvents: 'none' }} />
              </div>
              <div style={{ minWidth: 180 }}>
                <Select
                  value={bookStatus} onChange={setBookStatus}
                  options={[
                    { value: 'all', label: 'Все статусы' },
                    { value: 'pending', label: 'Ожидает' },
                    { value: 'confirmed', label: 'Подтверждено' },
                    { value: 'completed', label: 'Завершено' },
                    { value: 'cancelled', label: 'Отменено' }
                  ]}
                />
              </div>
              <Link to="/bookings/create" className="btn btn-gold" style={{ fontSize: 12 }}>+ Новая бронь</Link>
            </div>
            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
              {filteredBookings.length === 0
                ? <EmptyState icon="clipboard" title="Бронирований не найдено" />
                : <>
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr><th>Гость</th><th>Ресторан</th><th>Дата / Время</th><th>Гостей</th><th>Статус</th><th>Сумма</th><th>Действия</th></tr>
                        </thead>
                        <tbody>
                          {paginatedBookings.map(b => (
                            <tr key={b.id}>
                              <td>
                                <p style={{ fontWeight: 500, marginBottom: 4, fontSize: 14 }}>{b.guestName}</p>
                                <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{b.phone}</p>
                              </td>
                              <td style={{ fontSize: 13.5 }}>{b.restaurantName}</td>
                              <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{b.date}<br />{b.time}</td>
                              <td style={{ textAlign: 'center' }}>{b.guests}</td>
                              <td style={{ minWidth: 160 }}>
                                <Select
                                  value={b.status}
                                  onChange={v => handleStatusChange(b.id, v)}
                                  options={[
                                    { value: 'pending', label: 'Ожидает' },
                                    { value: 'confirmed', label: 'Подтверждено' },
                                    { value: 'completed', label: 'Завершено' },
                                    { value: 'cancelled', label: 'Отменено' }
                                  ]}
                                />
                              </td>
                              <td style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', fontSize: '1.2rem' }}>{b.totalAmount?.toLocaleString()} сом</td>
                              <td>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  <Link to={`/bookings/${b.id}/edit`} className="btn btn-ghost" style={{ fontSize: 11, padding: '6px 12px' }}>Ред.</Link>
                                  <button onClick={() => setDeleteBookId(b.id)} className="btn btn-danger" style={{ fontSize: 11, padding: '6px 12px' }}>Уд.</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {bookTotalPages > 1 && (
                      <div className="pagination">
                        <button onClick={bookPrevPage} disabled={!bookHasPrev} className="pagination-btn"><Icon name="arrow-left" size={16} /></button>
                        <span className="pagination-info">{bookPage} / {bookTotalPages}</span>
                        <button onClick={bookNextPage} disabled={!bookHasNext} className="pagination-btn"><Icon name="arrow-right" size={16} /></button>
                      </div>
                    )}
                  </>
              }
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === 'Пользователи' && (
          <div className="fade-in">
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
                <input className="input-field" placeholder="Поиск по имени или email..."
                  value={userSearch} onChange={e => setUserSearch(e.target.value)}
                  style={{ fontSize: 13, paddingLeft: 36 }} />
                <Icon name="search" size={16} style={{ position: 'absolute', left: 12, top: 13, color: 'var(--gray)', pointerEvents: 'none' }} />
              </div>
              <div style={{ minWidth: 180 }}>
                <Select
                  value={userRole} onChange={setUserRole}
                  options={[
                    { value: 'all', label: 'Все роли' },
                    { value: 'admin', label: 'Администраторы' },
                    { value: 'user', label: 'Пользователи' }
                  ]}
                />
              </div>
            </div>

            <div className="admin-stats-grid" style={{ marginBottom: 24 }}>
              {[
                { label: 'Всего', value: users.length, icon: 'users' },
                { label: 'Администраторов', value: users.filter(u => u.role === 'admin').length, icon: 'shield' },
                { label: 'Пользователей', value: users.filter(u => u.role === 'user').length, icon: 'user' },
              ].map(s => (
                <div key={s.label} className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div className="stat-card-icon" style={{ marginBottom: 0, width: 56, height: 56 }}><Icon name={s.icon} size={28} /></div>
                  <div>
                    <p className="stat-card-value">{s.value}</p>
                    <p className="stat-card-label">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
              {filteredUsers.length === 0
                ? <EmptyState icon="users" title="Пользователи не найдены" />
                : <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr><th>Пользователь</th><th>Email</th><th>Телефон</th><th>Дата регистрации</th><th>Роль</th><th>Действия</th></tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(u => (
                          <tr key={u.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                  width: 40, height: 40, borderRadius: '50%',
                                  background: u.role === 'admin' ? 'var(--gold)' : 'var(--bg)',
                                  color: u.role === 'admin' ? '#fff' : 'var(--text-muted)',
                                  border: `1px solid ${u.role === 'admin' ? 'var(--gold)' : 'var(--border)'}`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontFamily: 'var(--font-display)', fontSize: '1.2rem', flexShrink: 0,
                                }}>
                                  {u.avatar || u.name[0].toUpperCase()}
                                </div>
                                <span style={{ fontWeight: 500 }}>{u.name}</span>
                              </div>
                            </td>
                            <td style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>{u.email}</td>
                            <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{u.phone || '—'}</td>
                            <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{u.joined || '—'}</td>
                            <td style={{ minWidth: 160 }}>
                              <Select
                                value={u.role}
                                onChange={v => handleRoleChange(u.id, v)}
                                options={[{ value: 'user', label: 'Пользователь' }, { value: 'admin', label: 'Администратор' }]}
                              />
                            </td>
                            <td>
                              <button
                                onClick={() => setDeleteUserId(u.id)}
                                className="btn btn-danger"
                                style={{ fontSize: 11, padding: '6px 12px' }}
                                disabled={u.email === 'admin@aizarest.kg'}
                                title={u.email === 'admin@aizarest.kg' ? 'Нельзя удалить основного администратора' : ''}
                              >
                                Удал.
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              }
            </div>
          </div>
        )}
      </div>

      {deleteRestId && (
        <ConfirmModal
          title="Удалить ресторан?"
          text="Все связанные бронирования также будут удалены. Это действие необратимо."
          onConfirm={handleDeleteRest}
          onCancel={() => setDeleteRestId(null)}
        />
      )}
      {deleteBookId && (
        <ConfirmModal
          title="Удалить бронирование?"
          text="Это действие необратимо."
          onConfirm={handleDeleteBook}
          onCancel={() => setDeleteBookId(null)}
        />
      )}
      {deleteUserId && (
        <ConfirmModal
          title="Удалить пользователя?"
          text="Аккаунт будет удалён без возможности восстановления."
          onConfirm={handleDeleteUser}
          onCancel={() => setDeleteUserId(null)}
        />
      )}
    </div>
  );
}
