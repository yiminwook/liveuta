import { notification } from 'antd';
import { useId } from 'react';

interface ToastApiProps {
  title?: string;
  text: string;
  duration?: number;
  onClick?: () => void;
  onClose?: () => void;
}

const useToast = () => {
  const id = useId();

  const generateKey = () => {
    return `toast-${id}`;
  };

  const info = ({ title = 'Info', text, onClick, onClose, duration }: ToastApiProps) => {
    const key = generateKey();
    notification.info({
      message: title,
      description: text,
      key,
      onClick,
      onClose,
      duration,
      // icon
    });
    return key;
  };

  const success = ({ title = 'Success', text, duration, onClick, onClose }: ToastApiProps) => {
    const key = generateKey();
    notification.success({
      message: title,
      description: text,
      duration,
      key,
      onClick,
      onClose,
      // icon,
    });
    return key;
  };

  const error = ({ title = 'Error', text, duration, onClick, onClose }: ToastApiProps) => {
    const key = generateKey();
    notification.error({
      message: title,
      description: text,
      duration,
      key,
      onClick,
      onClose,
      // icon,
    });
    return key;
  };

  const warning = ({ title = 'Warning', text, duration, onClick, onClose }: ToastApiProps) => {
    const key = generateKey();
    notification.warning({
      message: title,
      description: text,
      onClick,
      onClose,
      duration,
      // icon,
    });

    return key;
  };

  /** 배열에 담은 key를 가진 토스트를 강제로 닫기 */
  const close = (key: string[]) => {
    key.forEach((key) => notification.destroy(key));
  };

  /** 모든 Toast를 강제로 닫기 */
  const closeAll = () => {
    notification.destroy();
  };

  return { info, success, error, warning, close, closeAll };
};

export default useToast;
