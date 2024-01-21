'use client';
import { filterAtom } from '@/atoms';
import { SheetAPIReturntype } from '@/types/inSheet';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode } from 'react';

interface HydrateProps {
  filter: keyof SheetAPIReturntype;
  children: ReactNode;
}
const Hydrate = ({ filter, children }: HydrateProps) => {
  useHydrateAtoms([[filterAtom, filter]]);
  return <>{children}</>;
};

export default Hydrate;
