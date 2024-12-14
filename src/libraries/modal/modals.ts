import { modals as mantineModals } from '@mantine/modals';
import DefaultModal from './DefaultModal';

export const modals = {
  default: DefaultModal,
};

declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

type Modal = keyof typeof modals;

type Payload<T extends Modal> = Omit<
  Parameters<typeof mantineModals.openContextModal<T>>[0],
  'modal' | 'centered'
>;

export function createModal<T extends Modal>(modal: T, payload: Payload<T>) {
  return mantineModals.openContextModal({
    ...payload,
    modal,
    centered: true,
  });
}
