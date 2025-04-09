import type { PropsWithChildren } from 'react';
import { createContext, useState, useContext } from 'react';
import type { BreadcrumbItem } from './Breadcrumb';

type UtilsBreadcrumbContextType = {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
};

const UtilsBreadcrumbContext = createContext<UtilsBreadcrumbContextType | null>(null);

export function useUtilsBreadcrumbContext() {
  const context = useContext(UtilsBreadcrumbContext);
  if (context === null) {
    throw new Error('useUtilsBreadcrumbContext must be used within a UtilsBreadcrumbProvider');
  }
  return context;
}

export function UtilsBreadcrumbProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  return (
    <UtilsBreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </UtilsBreadcrumbContext.Provider>
  );
}
