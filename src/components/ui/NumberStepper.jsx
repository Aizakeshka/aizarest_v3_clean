import Icon from './Icon';

export default function NumberStepper({ value, onChange, min = 1, max = 100 }) {
  const num = Number(value);
  return (
    <div className="number-stepper">
      <button
        type="button"
        className="stepper-btn"
        onClick={() => onChange(Math.max(min, num - 1))}
        disabled={num <= min}
      >
        <Icon name="minus" size={16} />
      </button>
      <div className="stepper-divider" />
      <span className="stepper-value">{value}</span>
      <div className="stepper-divider" />
      <button
        type="button"
        className="stepper-btn"
        onClick={() => onChange(Math.min(max, num + 1))}
        disabled={num >= max}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
