'use client';
import type { ContextModalProps } from '@mantine/modals';
import { ReactNode } from 'react';

export default function DefaultModal({
  context,
  id,
  innerProps,
}: ContextModalProps<{ children?: ReactNode }>) {
  return <>{innerProps.children}</>;
}
