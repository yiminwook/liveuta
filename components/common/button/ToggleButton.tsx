import { memo } from 'react';
import toggleButton from '@/components/common/button/ToggleButton.module.scss';

interface ToggleButtonProps {
  toggled: boolean;
  onChange: () => void;
  alt: string;
  disabled?: boolean;
}

const ToggleButton = ({ toggled, onChange, alt, disabled = false }: ToggleButtonProps) => {
  return (
    <label className={toggleButton['toggleButton']}>
      <input type="checkbox" checked={toggled} onChange={onChange} disabled={disabled} />
      <span className="blind">{alt}</span>
    </label>
  );
};
export default memo(ToggleButton);
