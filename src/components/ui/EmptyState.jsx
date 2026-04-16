import Icon from './Icon';

export default function EmptyState({ icon = 'clipboard', title = 'Ничего нет', text, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon name={icon} size={52} />
      </div>
      <p className="empty-title">{title}</p>
      {text && <p className="empty-text">{text}</p>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}
