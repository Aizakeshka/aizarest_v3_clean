import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

const TIME_SLOTS = ['11:00', '12:00', '13:00', '14:00', '15:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export default function TimePicker({ value, onChange, error, disabled = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open]);

  return (
    <div ref={ref} className="custom-select-root">
      <button
        type="button"
        disabled={disabled}
        className={`input-field custom-select-trigger time-trigger ${open ? 'open' : ''} ${error ? 'error' : ''}`}
        onClick={() => !disabled && setOpen(o => !o)}
      >
        <Icon name="clock" size={16} style={{ color: 'var(--gray)', marginRight: 8, flexShrink: 0 }} />
        <span className={value ? '' : 'custom-select-placeholder'}>
          {value || 'Выберите время'}
        </span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} style={{ marginLeft: 'auto', color: 'var(--gray)' }} />
      </button>

      {open && (
        <div className="custom-select-menu time-grid-menu">
          {TIME_SLOTS.map(t => (
            <button
              key={t}
              type="button"
              className={`time-slot-btn ${t === value ? 'selected' : ''}`}
              onClick={() => { onChange(t); setOpen(false); }}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
