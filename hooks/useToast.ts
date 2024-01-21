import { App } from 'antd';

interface ToastApiProps {
  title?: string;
  text: string;
  duration?: number;
  onClick?: () => void;
  onClose?: () => void;
}

const useToast = () => {
  const { notification } = App.useApp();

  const info = ({ title = 'Info', text, onClick, onClose, duration }: ToastApiProps) => {
    notification.info({
      message: title,
      description: text,
      onClick,
      onClose,
      duration,
      // icon
    });
  };

  const success = ({ title = 'Success', text, duration, onClick, onClose }: ToastApiProps) => {
    notification.success({
      message: title,
      description: text,
      duration,
      onClick,
      onClose,
      // icon,
    });
  };

  const error = ({ title = 'Error', text, duration, onClick, onClose }: ToastApiProps) => {
    notification.error({
      message: title,
      description: text,
      duration,
      onClick,
      onClose,
      // icon,
    });
  };

  const warning = ({ title = 'Warning', text, duration, onClick, onClose }: ToastApiProps) => {
    notification.warning({
      message: title,
      description: text,
      onClick,
      onClose,
      duration,
      // icon,
    });
  };

  /** 배열에 담은 key를 가진 토스트를 강제로 닫기 */
  // const close = (key: string[]) => {
  //   key.forEach((key) => notification.destroy(key));
  // };

  /** 모든 Toast를 강제로 닫기 */
  const closeAll = () => {
    notification.destroy();
  };

  return { info, success, error, warning, closeAll };
};

export default useToast;
