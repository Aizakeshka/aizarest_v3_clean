import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

export default function Select({
  options = [],
  value,
  onChange,
  placeholder = 'Выберите...',
  className = '',
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const normalise = (opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt;

  const selected = options.map(normalise).find(o => o.value === value);

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
    <div ref={ref} className={`custom-select-root ${className}`}>
      <button
        type="button"
        disabled={disabled}
        className={`input-field custom-select-trigger ${open ? 'open' : ''}`}
        onClick={() => !disabled && setOpen(o => !o)}
      >
        <span className={selected ? '' : 'custom-select-placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} style={{ marginLeft: 'auto', flexShrink: 0, color: 'var(--gray)' }} />
      </button>

      {open && (
        <div className="custom-select-menu">
          {options.map(opt => {
            const { value: v, label: l } = normalise(opt);
            const isSelected = v === value;
            return (
              <button
                key={v}
                type="button"
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => { onChange(v); setOpen(false); }}
              >
                <span>{l}</span>
                {isSelected && <Icon name="check" size={16} style={{ color: 'var(--gold)', marginLeft: 'auto', flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
