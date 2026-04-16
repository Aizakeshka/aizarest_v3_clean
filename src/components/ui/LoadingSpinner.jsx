export default function LoadingSpinner({ text = 'Загрузка...' }) {
  return (
    <div className="loading-wrapper">
      <div className="spinner" />
      <p className="loading-text">{text}</p>
    </div>
  );
}
