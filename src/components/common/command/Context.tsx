'use client';
import { useContext } from 'react';
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useCallback,
  useState,
} from 'react';
import GlobalCommands from './GlobalCommands';

type Command = {
  title: string;
  fn: () => void;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  keywords?: string[];
};

type CommandGroup = {
  heading: string;
  commands: Command[];
};

type CommandActionsContextType = {
  setCmdOpen: (open: boolean) => void;
  addCmdGroup: (group: CommandGroup) => void;
  removeCmdGroup: (heading: string) => void;
};

type CommandContextType = {
  cmdGroups: CommandGroup[];
  cmdOpen: boolean;
};

const CommandContext = createContext<CommandContextType | null>(null);

const CommandActionsContext = createContext<CommandActionsContextType | null>(null);

export function useCommand() {
  const context = useContext(CommandContext);
  if (context === null) {
    throw new Error('useCommandContext must be used within a CommandProvider');
  }
  return context;
}

export function useCommandActions() {
  const context = useContext(CommandActionsContext);
  if (!context) {
    throw new Error('useCommandActionsContext must be used within a CommandProvider');
  }
  return context;
}

export function CommandProvider({ children }: PropsWithChildren) {
  const [commandGroups, setCommandGroups] = useState<CommandGroup[]>([]);
  const [open, setOpen] = useState(false);

  const addCmdGroup = useCallback(
    (group: CommandGroup) => {
      if (commandGroups.some((g) => g.heading === group.heading)) {
        return;
      }
      setCommandGroups((prevGroups) => [group, ...prevGroups]);
    },
    [commandGroups],
  );

  const removeCmdGroup = useCallback(
    (heading: string) =>
      setCommandGroups((prevGroups) => prevGroups.filter((group) => group.heading !== heading)),
    [],
  );

  return (
    <CommandActionsContext.Provider
      value={{
        setCmdOpen: setOpen,
        addCmdGroup,
        removeCmdGroup,
      }}
    >
      <CommandContext.Provider value={{ cmdGroups: commandGroups, cmdOpen: open }}>
        <GlobalCommands />
        {children}
      </CommandContext.Provider>
    </CommandActionsContext.Provider>
  );
}
