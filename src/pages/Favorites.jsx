import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useFavorites } from '../hooks/useFavorites';
import RestaurantCard from '../components/RestaurantCard';
import EmptyState from '../components/ui/EmptyState';

export default function Favorites() {
  const { restaurants } = useApp();
  const { favorites } = useFavorites();

  const favoriteRestaurants = restaurants.filter(r => favorites.includes(r.id));

  return (
    <div style={{ minHeight: '80vh', background: 'var(--bg)' }}>
      <div className="page-header" style={{ paddingBottom: 56 }}>
        <div className="container">
          <p className="page-header-label">Мои избранные</p>
          <h1 className="page-header-title">Избранное</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
            {favoriteRestaurants.length} {favoriteRestaurants.length === 1 ? 'ресторан' : 'ресторанов'}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px' }}>
        {favoriteRestaurants.length === 0 ? (
          <EmptyState 
            icon="heart" 
            title="Нет избранных ресторанов"
            text="Добавьте рестораны в избранное, чтобы быстро находить их"
            action={<Link to="/restaurants" className="btn btn-gold">Выбрать рестораны</Link>}
          />
        ) : (
          <div className="grid-3">
            {favoriteRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
