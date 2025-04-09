import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

type MobileDrawerContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const MobileDrawerContext = createContext<MobileDrawerContextType | null>(null);

export function useMobileDrawerContext() {
  const context = useContext(MobileDrawerContext);
  if (context === null) {
    throw new Error('useMobileDrawerContext must be used within a MobileDrawerProvider');
  }
  return context;
}

export function MobileDrawerProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileDrawerContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </MobileDrawerContext.Provider>
  );
}
