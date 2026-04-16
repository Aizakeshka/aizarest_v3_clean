import Icon from './Icon';

export default function StarRating({ rating, size = 14, showNumber = true }) {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name={i < Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          className={i < Math.round(rating) ? 'star-filled' : 'star-empty'}
        />
      ))}
      {showNumber && (
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 4, fontWeight: 400 }}>
          {rating}
        </span>
      )}
    </div>
  );
}
