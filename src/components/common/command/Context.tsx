'use client';
import { useContext } from 'react';
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useCallback,
  useState,
} from 'react';
import GlobalCmd from './GlobalCmd';

type Cmd = {
  title: string;
  fn: () => void;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  keywords?: string[];
};

type CmdGroup = {
  id: string;
  heading: string;
  commands: Cmd[];
};

type CmdActionsContextType = {
  setCmdOpen: (open: boolean) => void;
  addCmdGroup: (group: CmdGroup) => void;
  removeCmdGroup: (id: string) => void;
};

type CmdContextType = {
  cmdGroups: CmdGroup[];
  cmdOpen: boolean;
};

const CmdContext = createContext<CmdContextType | null>(null);

const CmdActionsContext = createContext<CmdActionsContextType | null>(null);

export function useCmd() {
  const context = useContext(CmdContext);
  if (context === null) {
    throw new Error('useCmdContext must be used within a CommandProvider');
  }
  return context;
}

export function useCmdActions() {
  const context = useContext(CmdActionsContext);
  if (!context) {
    throw new Error('useCmdActionsContext must be used within a CommandProvider');
  }
  return context;
}

export function CmdProvider({ children }: PropsWithChildren) {
  const [cmdGroups, setCmdGroups] = useState<CmdGroup[]>([]);
  const [cmdOpen, setCmdOpen] = useState(false);

  const addCmdGroup = useCallback(
    (group: CmdGroup) => {
      if (cmdGroups.some((g) => g.heading === group.heading)) {
        return;
      }
      setCmdGroups((prevGroups) => [group, ...prevGroups]);
    },
    [cmdGroups],
  );

  const removeCmdGroup = useCallback(
    (id: string) => setCmdGroups((prevGroups) => prevGroups.filter((group) => group.id !== id)),
    [],
  );

  return (
    <CmdActionsContext.Provider
      value={{
        setCmdOpen,
        addCmdGroup,
        removeCmdGroup,
      }}
    >
      <CmdContext.Provider value={{ cmdGroups, cmdOpen }}>
        <GlobalCmd />
        {children}
      </CmdContext.Provider>
    </CmdActionsContext.Provider>
  );
}
