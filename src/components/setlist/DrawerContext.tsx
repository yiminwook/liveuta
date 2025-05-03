'use client';
import { TChannelDocumentWithoutId } from '@/libraries/mongodb/type';
import { Setlist } from '@/libraries/oracledb/setlist/service';
import { ReactNode, createContext, use, useMemo, useState } from 'react';

type SetlistDrawerActionContext = {
  onOpenChange: (value: boolean) => void;
  open: (setlist: Setlist, thumbnailUrl: string, channel?: TChannelDocumentWithoutId) => void;
};

type SetlistDrawerContext = {
  open: boolean;
  setlist?: Setlist;
  thumbnailUrl?: string;
  channel?: TChannelDocumentWithoutId;
};

// @ts-expect-error empty context
export const DrawerActionContext = createContext<SetlistDrawerActionContext>();
export const DrawerContext = createContext<SetlistDrawerContext>({
  open: false,
  setlist: undefined,
  thumbnailUrl: undefined,
  channel: undefined,
});

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [drawerContext, setDrawerContext] = useState<SetlistDrawerContext>({
    open: false,
    setlist: undefined,
    thumbnailUrl: undefined,
    channel: undefined,
  });

  const actions = useMemo<SetlistDrawerActionContext>(
    () => ({
      onOpenChange: (value: boolean) => {
        setDrawerContext({
          ...drawerContext,
          open: value,
        });
      },
      open: (setlist: Setlist, thumbnailUrl: string, channel?: TChannelDocumentWithoutId) => {
        setDrawerContext({
          open: true,
          setlist,
          thumbnailUrl,
          channel,
        });
      },
    }),
    [],
  );

  return (
    <DrawerActionContext value={actions}>
      <DrawerContext value={drawerContext}>{children}</DrawerContext>
    </DrawerActionContext>
  );
}

export function useDrawerActions() {
  return use(DrawerActionContext);
}

export function useDrawer() {
  return use(DrawerContext);
}
