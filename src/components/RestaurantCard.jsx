import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../context/AuthContext';
import StarRating from './ui/StarRating';
import Icon from './ui/Icon';

export default function RestaurantCard({ restaurant }) {
  const { showToast } = useApp();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { id, name, cuisine, address, rating, pricePerDish, image, tags } = restaurant;
  const fav = isFavorite(id);

  const onFavClick = (e) => {
    e.preventDefault();
    if (!user) { showToast('Войдите, чтобы добавить в избранное'); return; }
    toggleFavorite(id);
    showToast(fav ? 'Удалено из избранного' : 'Добавлено в избранное');
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <button
          onClick={onFavClick}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: fav ? '#E74C3C' : '#aaa',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
          title={fav ? 'Убрать из избранного' : 'В избранное'}
        >
          <Icon name={fav ? 'heart' : 'heart-outline'} size={17} />
        </button>
        {tags?.[0] && (
          <span className="badge badge-gold" style={{ position: 'absolute', bottom: 12, left: 12, fontSize: 10 }}>
            {tags[0]}
          </span>
        )}
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: 10 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: 1.2, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>
            {cuisine}
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text)', marginBottom: 4 }}>
            {name}
          </h3>
          <StarRating rating={rating} size={13} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--text-muted)' }}>
            <Icon name="map-pin" size={13} style={{ flexShrink: 0 }} />
            {address}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--text-muted)' }}>
            <Icon name="wallet" size={13} style={{ flexShrink: 0 }} />
            от {pricePerDish.toLocaleString()} сом / блюдо
          </span>
        </div>

        <Link
          to={`/restaurants/${id}`}
          className="btn btn-dark"
          style={{ marginTop: 'auto', justifyContent: 'center', fontSize: 11, letterSpacing: 1.2 }}
        >
          Забронировать
        </Link>
      </div>
    </div>
  );
}
