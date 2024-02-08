import { memo } from 'react';

interface ToggleButtonProps {
  toggled: boolean;
  onChange: () => void;
  alt: string;
  disabled?: boolean;
  className?: string;
}

const ToggleButton = ({ className, toggled, onChange, alt, disabled = false }: ToggleButtonProps) => {
  return (
    <label className={className}>
      <input type="checkbox" checked={toggled} onChange={onChange} disabled={disabled} />
      <span className="blind">{alt}</span>
    </label>
  );
};
export default memo(ToggleButton);
