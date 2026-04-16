import Icon from './Icon';

export default function ConfirmModal({ title, text, onConfirm, onCancel, confirmLabel = 'Удалить', danger = true }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: danger ? 'var(--error-bg)' : 'var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: danger ? 'var(--error)' : 'var(--gold)' }}>
          <Icon name={danger ? 'trash' : 'info'} size={22} />
        </div>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-text">{text}</p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>Отмена</button>
          <button className={`btn ${danger ? 'btn-danger' : 'btn-gold'}`} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
