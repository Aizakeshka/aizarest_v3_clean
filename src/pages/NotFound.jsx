import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--black)', textAlign: 'center', padding: '80px 24px', position: 'relative', overflow: 'hidden'
    }}>
      <div className="notfound-watermark" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: '30vw', fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.03)',
        fontWeight: 300, lineHeight: 1, pointerEvents: 'none', userSelect: 'none'
      }}>
        404
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ width: 64, height: 2, background: 'var(--gold)', margin: '0 auto 32px' }} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
          Страница не найдена
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 400, margin: '0 auto 48px', lineHeight: 1.8 }}>
          Возможно, эта страница была удалена, перенесена или вы перешли по неверной ссылке.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-gold" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px' }}>
             <Icon name="home" size={16} /> На главную
          </Link>
          <Link to="/restaurants" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px' }}>
            <Icon name="search" size={16} /> Искать рестораны
          </Link>
        </div>
      </div>
    </div>
  );
}
