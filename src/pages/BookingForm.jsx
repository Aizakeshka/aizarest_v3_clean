import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Select from '../components/ui/Select';
import TimePicker from '../components/ui/TimePicker';
import NumberStepper from '../components/ui/NumberStepper';

export default function BookingForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { restaurants, bookings, addBooking, updateBooking, showToast } = useApp();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const existingBooking = isEdit ? bookings.find(b => b.id === Number(id)) : null;

  const [form, setForm] = useState({
    restaurantId: existingBooking ? String(existingBooking.restaurantId) : '',
    guestName: existingBooking?.guestName || user?.name || '',
    phone: existingBooking?.phone || user?.phone || '',
    date: existingBooking?.date || '',
    time: existingBooking?.time || '',
    guests: existingBooking?.guests || 2,
    comment: existingBooking?.comment || '',
    status: existingBooking?.status || 'pending',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const selectedRest = restaurants?.find(r => r.id === Number(form.restaurantId));
  const today = new Date().toISOString().split('T')[0];

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.restaurantId) e.restaurantId = 'Выберите ресторан';
    if (!form.guestName?.trim()) e.guestName = 'Введите имя';
    if (!form.phone?.trim()) e.phone = 'Введите телефон';
    if (!form.date) e.date = 'Выберите дату';
    if (!form.time) e.time = 'Выберите время';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const payload = {
      ...form,
      restaurantId: Number(form.restaurantId),
      restaurantName: selectedRest?.name || '',
      guests: Number(form.guests),
      totalAmount: Number(form.guests) * (selectedRest?.pricePerDish || 350) * 3,
      userId: user?.id,
    };
    if (isEdit) {
      updateBooking(Number(id), payload);
      showToast('Бронирование обновлено!');
    } else {
      addBooking(payload);
      showToast('Бронирование создано!');
    }
    setLoading(false);
    navigate(isAdmin ? '/admin' : '/dashboard');
  };

  const restaurantOptions = restaurants.map(r => ({ value: String(r.id), label: `${r.name} — ${r.address}` }));

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      <div className="page-header" style={{ paddingBottom: 48 }}>
        <div className="container">
          <p className="page-header-label">
            {isEdit ? 'Редактирование' : 'Новое бронирование'}
          </p>
          <h1 className="page-header-title">
            {isEdit ? 'Редактировать бронь' : 'Создать бронирование'}
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px', maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: '40px', boxShadow: 'var(--shadow)', marginBottom: 24, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              <div className="input-group">
                <label className="input-label">Ресторан *</label>
                <Select
                  options={restaurantOptions}
                  value={form.restaurantId}
                  onChange={v => set('restaurantId', v)}
                  placeholder="Выберите ресторан"
                  className={errors.restaurantId ? 'error' : ''}
                />
                {errors.restaurantId && <p className="input-error">{errors.restaurantId}</p>}
              </div>

              {selectedRest && (
                <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--text-muted)' }}>
                  Средняя цена за блюдо: <strong style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400 }}>{selectedRest.pricePerDish.toLocaleString()} сом</strong> · Вместимость: до {selectedRest.capacity} гостей
                </div>
              )}

              <div className="grid-2">
                <div className="input-group">
                  <label className="input-label">Имя гостя *</label>
                  <input className={`input-field ${errors.guestName ? 'error' : ''}`}
                    value={form.guestName} onChange={e => set('guestName', e.target.value)} placeholder="Айгуль Маматова" />
                  {errors.guestName && <p className="input-error">{errors.guestName}</p>}
                </div>
                <div className="input-group">
                  <label className="input-label">Телефон *</label>
                  <input className={`input-field ${errors.phone ? 'error' : ''}`}
                    value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+996 700 123 456" />
                  {errors.phone && <p className="input-error">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid-2">
                <div className="input-group">
                  <label className="input-label">Дата *</label>
                  <input type="date" className={`input-field ${errors.date ? 'error' : ''}`}
                    min={today} value={form.date} onChange={e => set('date', e.target.value)} />
                  {errors.date && <p className="input-error">{errors.date}</p>}
                </div>
                <div className="input-group">
                  <label className="input-label">Время *</label>
                  <TimePicker value={form.time} onChange={v => set('time', v)} error={errors.time} />
                  {errors.time && <p className="input-error">{errors.time}</p>}
                </div>
              </div>

              <div className="grid-2">
                <div className="input-group">
                  <label className="input-label">Количество гостей *</label>
                  <NumberStepper
                    value={form.guests}
                    onChange={v => set('guests', v)}
                    min={1}
                    max={selectedRest?.capacity || 100}
                  />
                  {errors.guests && <p className="input-error">{errors.guests}</p>}
                </div>
                {isEdit && (
                  <div className="input-group">
                    <label className="input-label">Статус</label>
                    <Select
                      value={form.status}
                      onChange={v => set('status', v)}
                      options={[
                        { value: 'pending', label: 'Ожидает' },
                        { value: 'confirmed', label: 'Подтверждено' },
                        { value: 'completed', label: 'Завершено' },
                        { value: 'cancelled', label: 'Отменено' }
                      ]}
                    />
                  </div>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">Пожелания</label>
                <textarea className="input-field" rows={3}
                  placeholder="Столик у окна, аллергия, особый повод..."
                  value={form.comment} onChange={e => set('comment', e.target.value)}
                  style={{ resize: 'vertical' }} />
              </div>

              {selectedRest && form.guests > 0 && (
                <div style={{ background: 'var(--bg)', padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)' }}>
                  <div>
                    <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, marginBottom: 4 }}>Ориентировочная сумма</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{form.guests} гостей × {selectedRest.pricePerDish.toLocaleString()} сом × ~3 блюда</p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>
                    {(Number(form.guests) * selectedRest.pricePerDish * 3).toLocaleString()} сом
                  </p>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Отмена</button>
            <button type="submit" className="btn btn-gold" disabled={loading}>
              {loading ? <><span className="btn-spinner" /> Сохранение...</> : isEdit ? 'Сохранить' : 'Создать бронирование'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
