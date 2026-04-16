import { useApp } from '../../context/AppContext';
import Icon from './Icon';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className={`toast toast-${toast.type}`}>
      <Icon name={toast.type === 'success' ? 'check-circle' : 'x-circle'} size={18} />
      {toast.message}
    </div>
  );
}
