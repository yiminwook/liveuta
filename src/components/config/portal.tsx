import { createPortal } from 'react-dom';
import { PORTAL_ID } from '@/constants';

interface Props {
  id?: string;
  children: React.ReactNode;
}

export default function Portal({ children, id = PORTAL_ID }: Props) {
  const container = document.getElementById(id);

  if (!container) {
    throw new Error(`Container not found: ${id}`);
  }

  return createPortal(children, container);
}
