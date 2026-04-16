import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';

const LINKS = [
  { to: '/restaurants', label: 'Рестораны' },
  { to: '/dashboard', label: 'Кабинет' },
  { to: '/favorites', label: 'Избранное' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--black)', color: 'rgba(255,255,255,0.6)', padding: '64px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: 2, marginBottom: 20 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#fff' }}>Aiza</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', fontStyle: 'italic' }}>Rest</span>
            </Link>
            <p style={{ fontSize: 13.5, lineHeight: 1.8, maxWidth: 260 }}>
              Платформа бронирования столиков в лучших ресторанах Кыргызстана.
            </p>
          </div>

          <div>
            <p style={{ fontSize: 10.5, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 20, fontWeight: 500 }}>
              Навигация
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LINKS.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 10.5, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 20, fontWeight: 500 }}>
              Контакты
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: 'map-pin', text: 'Бишкек, Кыргызстан' },
                { icon: 'phone', text: '+996 312 00-00-00' },
                { icon: 'mail', text: 'hello@aizarest.kg' },
              ].map(c => (
                <span key={c.text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.55)' }}>
                  <Icon name={c.icon} size={15} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  {c.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12.5 }}>© 2025 AizaRest. Все права защищены.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5 }}>
            <Icon name="utensils" size={14} style={{ color: 'var(--gold)' }} />
            Гастрономия Кыргызстана
          </div>
        </div>
      </div>
    </footer>
  );
}
