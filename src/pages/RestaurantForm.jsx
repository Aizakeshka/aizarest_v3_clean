import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Select from '../components/ui/Select';
import Icon from '../components/ui/Icon';

const CUISINES = ['Кыргызская кухня', 'Средиземноморская', 'Авторская кухня', 'Узбекская и кыргызская', 'Европейская', 'Кочевая кухня', 'Азиатская', 'Японская'];

const EMPTY = {
  name: '', cuisine: 'Кыргызская кухня', address: '', phone: '',
  pricePerDish: '', capacity: '', description: '', workHours: '',
  image: '', tags: '', menu: [],
};

function Field({ label, value, onChange, error, type = 'text', placeholder, required, icon }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}{required && ' *'}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          className={`input-field ${error ? 'error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={icon ? { paddingLeft: 38 } : {}}
        />
        {icon && <Icon name={icon} size={16} style={{ position: 'absolute', left: 12, top: 13, color: 'var(--gray)', pointerEvents: 'none' }} />}
      </div>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
}

export default function RestaurantForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { restaurants, addRestaurant, updateRestaurant, showToast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const r = restaurants.find(r => r.id === Number(id));
      if (r) setForm({ ...EMPTY, ...r, tags: r.tags?.join(', ') || '', menu: r.menu || [] });
    }
  }, [id, restaurants, isEdit]);

  const set = useCallback((key, val) => setForm(p => ({ ...p, [key]: val })), []);

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = 'Введите название';
    if (!form.address?.trim()) e.address = 'Введите адрес';
    if (!form.phone?.trim()) e.phone = 'Введите телефон';
    if (!form.pricePerDish || isNaN(form.pricePerDish) || Number(form.pricePerDish) < 1) e.pricePerDish = 'Укажите корректную цену';
    if (!form.capacity || isNaN(form.capacity) || Number(form.capacity) < 1) e.capacity = 'Укажите вместимость';
    if (!form.description?.trim()) e.description = 'Добавьте описание';
    if (!form.workHours?.trim()) e.workHours = 'Укажите часы работы';
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
      pricePerDish: Number(form.pricePerDish),
      capacity: Number(form.capacity),
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      image: form.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      menu: (form.menu || []).map(m => ({ ...m, price: Number(m.price) || 0 })),
    };
    if (isEdit) {
      updateRestaurant(Number(id), payload);
      showToast('Ресторан обновлён!');
    } else {
      addRestaurant(payload);
      showToast('Ресторан добавлен!');
    }
    setLoading(false);
    navigate('/admin');
  };

  const updateMenuItem = useCallback((i, field, value) => {
    setForm(p => {
      const menu = [...p.menu];
      menu[i] = { ...menu[i], [field]: value };
      return { ...p, menu };
    });
  }, []);

  const addMenuItem = useCallback(() => {
    setForm(p => ({ ...p, menu: [...p.menu, { name: '', desc: '', price: '' }] }));
  }, []);

  const removeMenuItem = useCallback((i) => {
    setForm(p => ({ ...p, menu: p.menu.filter((_, j) => j !== i) }));
  }, []);

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      <div className="page-header" style={{ paddingBottom: 48 }}>
        <div className="container">
          <p className="page-header-label">{isEdit ? 'Редактирование' : 'Создание'}</p>
          <h1 className="page-header-title">{isEdit ? 'Редактировать ресторан' : 'Добавить ресторан'}</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px', maxWidth: 800 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow)', padding: '40px', marginBottom: 24, border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, marginBottom: 28, color: 'var(--text)' }}>Основная информация</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="grid-2">
                <Field label="Название ресторана" placeholder="Манас Гранд" required
                  value={form.name} onChange={e => set('name', e.target.value)} error={errors.name} />
                <div className="input-group">
                  <label className="input-label">Кухня *</label>
                  <Select
                    options={CUISINES}
                    value={form.cuisine}
                    onChange={v => set('cuisine', v)}
                  />
                </div>
              </div>
              <div className="grid-2">
                <Field label="Полный адрес" icon="map-pin" placeholder="ул. Чуй, 114, Бишкек" required
                  value={form.address} onChange={e => set('address', e.target.value)} error={errors.address} />
                <Field label="Телефон" icon="phone" placeholder="+996 312 44-11-22" required
                  value={form.phone} onChange={e => set('phone', e.target.value)} error={errors.phone} />
              </div>
              <div className="grid-2">
                <Field label="Часы работы" icon="clock" placeholder="Пн–Вс: 11:00 – 23:00" required
                  value={form.workHours} onChange={e => set('workHours', e.target.value)} error={errors.workHours} />
                <Field label="URL фото" placeholder="https://..."
                  value={form.image} onChange={e => set('image', e.target.value)} />
              </div>
              <div className="grid-2">
                <Field label="Средняя цена за блюдо (сом)" icon="wallet" type="number" placeholder="350" required
                  value={form.pricePerDish} onChange={e => set('pricePerDish', e.target.value)} error={errors.pricePerDish} />
                <Field label="Вместимость (гостей)" icon="users" type="number" placeholder="80" required
                  value={form.capacity} onChange={e => set('capacity', e.target.value)} error={errors.capacity} />
              </div>
              <div className="input-group">
                <label className="input-label">Описание *</label>
                <textarea className={`input-field ${errors.description ? 'error' : ''}`}
                  rows={4} placeholder="Расскажите об атмосфере и особенностях ресторана..."
                  value={form.description} onChange={e => set('description', e.target.value)}
                  style={{ resize: 'vertical' }} />
                {errors.description && <p className="input-error">{errors.description}</p>}
              </div>
              <div className="input-group">
                <label className="input-label">Теги (через запятую)</label>
                <input type="text" className="input-field" placeholder="Панорамный вид, Живая музыка, Банкеты"
                  value={form.tags} onChange={e => set('tags', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Menu editor */}
          <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow)', padding: '40px', marginBottom: 24, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text)' }}>
                Меню <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>({form.menu?.length || 0} позиций)</span>
              </h3>
              <button type="button" className="btn btn-ghost" style={{ fontSize: 12 }} onClick={addMenuItem}>
                <Icon name="plus" size={14} /> Добавить блюдо
              </button>
            </div>
            {!form.menu?.length && (
              <p style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', padding: '32px 0' }}>
                Нет блюд. Нажмите «Добавить блюдо»
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(form.menu || []).map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1.5fr) 120px auto', gap: 12, alignItems: 'end' }}>
                  <div className="input-group" style={{ margin: 0 }}>
                    {i === 0 && <label className="input-label">Название блюда</label>}
                    <input className="input-field" placeholder="Бешбармак" value={item.name}
                      onChange={e => updateMenuItem(i, 'name', e.target.value)} />
                  </div>
                  <div className="input-group" style={{ margin: 0 }}>
                    {i === 0 && <label className="input-label">Описание</label>}
                    <input className="input-field" placeholder="Краткое описание..." value={item.desc}
                      onChange={e => updateMenuItem(i, 'desc', e.target.value)} />
                  </div>
                  <div className="input-group" style={{ margin: 0 }}>
                    {i === 0 && <label className="input-label">Цена (сом)</label>}
                    <input className="input-field" type="number" placeholder="350" value={item.price}
                      onChange={e => updateMenuItem(i, 'price', e.target.value)} />
                  </div>
                  <button type="button" className="btn btn-danger" style={{ width: 44, height: 44, padding: 0 }}
                    onClick={() => removeMenuItem(i)}>
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => navigate('/admin')}>Отмена</button>
            <button type="submit" className="btn btn-gold" disabled={loading}>
              {loading ? <><span className="btn-spinner" /> Сохранение...</> : isEdit ? 'Сохранить изменения' : 'Добавить ресторан'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
