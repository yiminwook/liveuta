import { useContext } from 'react';
import ModalContext from '@/libraries/modal/ModalContext';

export default function useModalStore() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Need to register ModalProvider');
  return context;
}
