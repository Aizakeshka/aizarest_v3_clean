import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import StarRating from '../components/ui/StarRating';
import TimePicker from '../components/ui/TimePicker';
import NumberStepper from '../components/ui/NumberStepper';
import Icon from '../components/ui/Icon';

export default function RestaurantDetail() {
  const { id } = useParams();
  const { restaurants, addBooking, showToast } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const restaurant = restaurants.find(r => r.id === Number(id));
  const capacity = restaurant?.capacity || 100;

  const [form, setForm] = useState({ date: '', time: '', guests: 2, phone: user?.phone || '', comment: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');

  if (!restaurant) return (
    <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 16 }}>Ресторан не найден</h2>
      <Link to="/restaurants" className="btn btn-gold">Все рестораны</Link>
    </div>
  );

  const { name, cuisine, address, phone, rating, pricePerDish, image, gallery, description, workHours, tags, menu } = restaurant;

  const validate = () => {
    const e = {};
    if (!form.date) e.date = 'Выберите дату';
    else if (new Date(form.date) < new Date(new Date().setHours(0,0,0,0))) e.date = 'Дата в прошлом';
    if (!form.time) e.time = 'Выберите время';
    if (!form.phone) e.phone = 'Укажите номер';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!user) { navigate('/login'); return; }
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    addBooking({
      restaurantId: restaurant.id,
      restaurantName: name,
      guestName: user.name,
      userId: user.id,
      ...form,
      totalAmount: Number(form.guests) * pricePerDish * 3,
    });
    setBooked(true);
    showToast('Бронирование успешно создано!');
    setLoading(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const fav = isFavorite(restaurant.id);

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero Image */}
      <div style={{ height: 420, position: 'relative', overflow: 'hidden' }}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85))' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0 }}>
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {tags?.map(t => <span key={t} className="badge badge-gold">{t}</span>)}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: 'white', marginBottom: 12 }}>{name}</h1>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <StarRating rating={rating} />
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                <Icon name="map-pin" size={14} /> {address}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--gold)', fontWeight: 500 }}>
                <Icon name="wallet" size={14} /> {pricePerDish.toLocaleString()} сом / блюдо
              </span>
            </div>
          </div>
        </div>
        <Link to="/restaurants" style={{
          position: 'absolute', top: 24, left: 24,
          background: 'rgba(0,0,0,0.4)', color: 'white', padding: '10px 20px',
          borderRadius: 40, fontSize: 13, backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', gap: 8, transition: 'var(--transition)'
        }} onMouseEnter={e => e.currentTarget.style.background='rgba(0,0,0,0.7)'} onMouseLeave={e => e.currentTarget.style.background='rgba(0,0,0,0.4)'}>
          <Icon name="arrow-left" size={16} /> Назад
        </Link>
        <button
          onClick={() => { if (!user) { showToast('Войдите, чтобы добавить в избранное'); return; } toggleFavorite(restaurant.id); showToast(fav ? 'Удалено' : 'Добавлено'); }}
          style={{
            position: 'absolute', top: 24, right: 24,
            background: 'rgba(255,255,255,0.95)', border: 'none',
            width: 48, height: 48, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: fav ? '#E74C3C' : 'var(--gray)', transition: 'var(--transition)',
            backdropFilter: 'blur(10px)', boxShadow: 'var(--shadow-md)'
          }}
        >
          <Icon name={fav ? 'heart' : 'heart-outline'} size={22} />
        </button>
      </div>

      <div className="container restaurant-detail-grid">
        {/* Left */}
        <div>
          <div className="tab-bar" style={{ marginBottom: 40 }}>
            {['menu', 'info', 'gallery'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-btn ${activeTab === tab ? 'active' : ''}`}>
                {tab === 'menu' ? 'Меню' : tab === 'info' ? 'О ресторане' : 'Галерея'}
              </button>
            ))}
          </div>

          {activeTab === 'menu' && (
            <div className="fade-in">
              <div style={{ background: 'var(--surface)', padding: '16px 24px', borderRadius: 'var(--radius-md)', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Позиций в меню: {menu?.length || 0}</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Средняя цена: <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold)', marginLeft: 8 }}>{menu && menu.length ? Math.round(menu.reduce((s, m) => s + (m.price || pricePerDish), 0) / menu.length).toLocaleString() : pricePerDish.toLocaleString()} сом</span></p>
              </div>
              <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                {menu?.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '24px', borderBottom: i < menu.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div>
                      <p style={{ fontWeight: 500, marginBottom: 6, color: 'var(--text)', fontSize: 15 }}>{item.name}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 400 }}>{item.desc}</p>
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)', whiteSpace: 'nowrap', marginLeft: 20 }}>
                      {(item.price || pricePerDish).toLocaleString()} сом
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="fade-in">
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 40 }}>{description}</p>
              <div className="grid-2">
                {[
                  { icon: 'phone', label: 'Телефон', value: phone },
                  { icon: 'clock', label: 'Часы работы', value: workHours },
                  { icon: 'map-pin', label: 'Адрес', value: address },
                  { icon: 'users', label: 'Вместимость', value: `до ${capacity} гостей` },
                ].map(item => (
                  <div key={item.label} className="info-card" style={{ border: '1px solid var(--border)' }}>
                    <div className="info-card-icon"><Icon name={item.icon} size={24} /></div>
                    <p className="info-card-label">{item.label}</p>
                    <p className="info-card-value">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {[image, ...(gallery || [])].map((src, i) => (
                <div key={i} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: 240 }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Form Stick */}
        <div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '36px', boxShadow: 'var(--shadow-lg)', position: 'sticky', top: 100 }}>
            {booked ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ color: 'var(--success)', marginBottom: 20 }}><Icon name="check-circle" size={64} style={{ margin: '0 auto' }} /></div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 12, color: 'var(--text)' }}>Бронь создана!</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 }}>Мы свяжемся с вами для подтверждения</p>
                <Link to="/dashboard" className="btn btn-gold" style={{ width: '100%' }}>Мои брони</Link>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 6, color: 'var(--text)' }}>Забронировать стол</h3>
                <p style={{ fontSize: 13, color: 'var(--gold)', marginBottom: 32 }}>{cuisine}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div className="input-group">
                    <label className="input-label">Дата</label>
                    <input type="date" className={`input-field ${errors.date ? 'error' : ''}`}
                      min={today} value={form.date}
                      onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                    />
                    {errors.date && <p className="input-error">{errors.date}</p>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Время</label>
                    <TimePicker value={form.time} onChange={v => setForm(p => ({...p, time: v}))} error={errors.time} />
                    {errors.time && <p className="input-error">{errors.time}</p>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Гости</label>
                    <NumberStepper value={form.guests} onChange={v => setForm(p => ({...p, guests: v}))} max={capacity} />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Телефон</label>
                    <div style={{ position: 'relative' }}>
                      <input type="tel" className={`input-field ${errors.phone ? 'error' : ''}`}
                        placeholder="+996 700 123 456"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        style={{ paddingLeft: 38 }} />
                      <Icon name="phone" size={16} style={{ position: 'absolute', left: 12, top: 13, color: 'var(--gray)', pointerEvents: 'none' }} />
                    </div>
                    {errors.phone && <p className="input-error">{errors.phone}</p>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Пожелания</label>
                    <textarea className="input-field" rows={3}
                      placeholder="Столик у окна, аллергия..."
                      value={form.comment}
                      onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
                      style={{ resize: 'vertical' }} />
                  </div>

                  <div style={{ background: 'var(--bg)', padding: '20px', borderRadius: 'var(--radius)', marginTop: 8, border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
                      <span>Цена за блюдо</span><span>{pricePerDish.toLocaleString()} сом</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                      <span>Гостей</span><span>{form.guests} чел.</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text)' }}>
                      <span>Итого ~</span>
                      <span style={{ color: 'var(--gold)' }}>{(Number(form.guests) * pricePerDish * 3).toLocaleString()} сом</span>
                    </div>
                  </div>

                  <button className="btn btn-gold" style={{ width: '100%', padding: '14px 20px', fontSize: 13, marginTop: 8 }}
                    onClick={handleSubmit} disabled={loading}>
                    {loading ? <><span className="btn-spinner" /> Обработка...</> : user ? 'Забронировать' : 'Войдите для брони'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
