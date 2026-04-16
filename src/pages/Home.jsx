import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RestaurantCard from '../components/RestaurantCard';
import Icon from '../components/ui/Icon';

export default function Home() {
  const { restaurants } = useApp();
  const top = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', background: 'var(--black)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
          <p className="section-label" style={{ marginBottom: 24 }}>Кыргызстан · Гастрономия · Культура</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, color: '#fff', lineHeight: 1.08, maxWidth: 760, marginBottom: 24 }}>
            Откройте лучшие<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>рестораны</span> страны
          </h1>
          <div className="gold-line" style={{ marginBottom: 28 }} />
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 500, marginBottom: 48, lineHeight: 1.85 }}>
            AizaRest — платформа бронирования столиков в лучших ресторанах Бишкека, Оша и всего Кыргызстана. Онлайн, быстро, без очередей.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/restaurants" className="btn btn-gold">
              <Icon name="utensils" size={15} /> Выбрать ресторан
            </Link>
            <Link to="/register" className="btn btn-outline">
              <Icon name="user" size={15} /> Присоединиться
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 48, marginTop: 64, flexWrap: 'wrap' }}>
            {[
              { num: restaurants.length, label: 'Ресторанов' },
              { num: '1 200+', label: 'Бронирований' },
              { num: '4.7', label: 'Средний рейтинг' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--gold)', fontWeight: 400 }}>{s.num}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '100px 0', background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-label" style={{ marginBottom: 16 }}>Просто и удобно</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--text)' }}>Как это работает</h2>
          </div>
          <div className="grid-3">
            {[
              { step: '01', icon: 'search', title: 'Выберите ресторан', desc: 'Изучите меню, фото, отзывы и цены. Найдите идеальное место для любого события.' },
              { step: '02', icon: 'calendar', title: 'Забронируйте столик', desc: 'Укажите дату, время и количество гостей. Подтверждение приходит мгновенно.' },
              { step: '03', icon: 'star', title: 'Наслаждайтесь', desc: 'Приходите в ресторан — ваш столик уже ждёт. Никаких очередей и ожидания.' },
            ].map(item => (
              <div key={item.step} style={{ textAlign: 'center', padding: '40px 24px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '4.5rem', color: 'var(--border)', fontWeight: 300, lineHeight: 1, marginBottom: 20 }}>{item.step}</div>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--gold)' }}>
                  <Icon name={item.icon} size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 400, marginBottom: 12, color: 'var(--text)' }}>{item.title}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Restaurants */}
      <section style={{ padding: '100px 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 12 }}>Рекомендуем</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--text)' }}>Лучшие рестораны</h2>
            </div>
            <Link to="/restaurants" className="btn btn-ghost">
              Все рестораны <Icon name="arrow-right" size={15} />
            </Link>
          </div>
          <div className="grid-3">
            {top.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid-4">
            {[
              { icon: 'check-circle', title: 'Мгновенное подтверждение', desc: 'Бронь подтверждается за секунды' },
              { icon: 'shield', title: 'Надёжно и безопасно', desc: 'Ваши данные под защитой' },
              { icon: 'star', title: 'Проверенные рестораны', desc: 'Только лучшие заведения страны' },
              { icon: 'phone', title: 'Поддержка 24 / 7', desc: 'Всегда готовы помочь' },
            ].map(f => (
              <div key={f.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                  <Icon name={f.icon} size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 400, marginBottom: 4, color: 'var(--text)' }}>{f.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--black)', padding: '100px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <p className="section-label" style={{ marginBottom: 20 }}>Начните сейчас</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: '#fff', marginBottom: 20 }}>
            Зарегистрируйтесь и получите<br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>первую бронь бесплатно</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.8 }}>
            Присоединяйтесь к тысячам гостей, которые доверяют AizaRest для особых вечеров и деловых встреч.
          </p>
          <Link to="/register" className="btn btn-gold">
            <Icon name="user" size={15} /> Создать аккаунт
          </Link>
        </div>
      </section>
    </div>
  );
}
