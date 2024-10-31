// @ts-ignore
import { toast, type Id } from 'react-toastify';

type ToastType = 'success' | 'info' | 'warn' | 'error';

type Toast = {
  id: Id;
  dismiss: boolean;
};

class ToastHandler {
  toasts: Toast[] = [];

  /**
   * Add toast to toast list
   * @example
   * addToast('success', 'Success Message');
   * addToast('info', 'Info Message', false);
   * @param type 'success' | 'info' | 'warn' | 'error'
   * @param string String that will be displayed in toast
   * @param dismiss If true, toast will be dismissed after 3 seconds
   */
  addToast(type: ToastType, string: string, dismiss: boolean = true) {
    let current: Toast;
    switch (type) {
      case 'success':
        current = { id: toast.success(string), dismiss };
        break;
      case 'info':
        current = { id: toast.info(string), dismiss };
        break;
      case 'warn':
        current = { id: toast.warn(string), dismiss };
        break;
      case 'error':
        current = { id: toast.error(string), dismiss };
        break;
    }

    if (this.toasts.length > 1) {
      for (let i = 0; i < this.toasts.length; i++) {
        if (this.toasts[i].dismiss === true) {
          toast.dismiss(this.toasts[i].id);
          this.toasts.splice(i, 1);
          break;
        }
      }
    }

    this.toasts.push(current);
  }
}

const toastHandler = new ToastHandler();

const addToast = toastHandler.addToast.bind(toastHandler);

export default addToast;
