'use client';
import { useSetAppStore } from '@/stores/app';
import { useId } from '@mantine/hooks';
import React, { useEffect } from 'react';

type RemoveScrollProps = {
  enable?: boolean;
  preventScroll?: boolean;
  children?: React.ReactNode;
};

export default function RemoveScroll({ children, enable = true }: RemoveScrollProps) {
  const id = useId();
  const actions = useSetAppStore();

  useEffect(() => {
    if (!enable) return;
    actions.addRemoveElId(id);
    return () => {
      actions.removeRemoveElId(id);
    };
  }, [id, enable]);

  return <>{children}</>;
}
