import { clipText } from '@/utils/windowEvent';
import { CSSProperties, MouseEvent } from 'react';
import { FaCopy } from 'react-icons/fa';
import copyButton from '@/components/common/button/CopyButton.module.scss';
import useToast from '@/hooks/useToast';
import { gtagClick } from '@/utils/gtag';

interface CopyButtonProps {
  value: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
}

/** value 복사할 값 */
const CopyButton = ({ value, size = '2rem', className, style }: CopyButtonProps) => {
  const toast = useToast();

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    clipText(value);
    gtagClick({
      target: 'copyButton',
      content: 'copyButton',
      detail: value,
      action: 'copy',
    });
    toast.success({ text: '복사되었습니다.' });
  };

  return (
    <button className={[copyButton['copy-button'], className].join(' ')} onClick={onClick} style={style}>
      <FaCopy size={size} color="inherit" />
    </button>
  );
};

export default CopyButton;
