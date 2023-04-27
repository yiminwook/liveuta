import { clipText } from '@/utils/windowEvent';
import { CSSProperties, MouseEvent } from 'react';
import { FaCopy } from 'react-icons/fa';
import copyButton from '@/styles/common/CopyButton.module.scss';

interface CopyButtonProps {
  value: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
}

/** value 복사할 값 */
const CopyButton = ({ value, size = '2rem', className, style }: CopyButtonProps) => {
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    clipText(value);
  };

  return (
    <button className={[copyButton['copy-button'], className].join(' ')} onClick={onClick} style={style}>
      <FaCopy size={size} color={'inherit'} />
    </button>
  );
};

export default CopyButton;
