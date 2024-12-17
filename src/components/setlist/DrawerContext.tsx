'use client';
import { ChannelDataset } from '@/libraries/mongoDB/getAllChannel';
import { Setlist } from '@/libraries/oracleDB/setlist/service';
import { ReactNode, createContext, use, useEffect, useMemo, useState } from 'react';

type SetlistDrawerActionContext = {
  onOpenChange: (value: boolean) => void;
  open: (setlist: Setlist, thumbnailUrl: string, channel?: ChannelDataset['channel_id']) => void;
};

type SetlistDrawerContext = {
  open: boolean;
  setlist?: Setlist;
  thumbnailUrl?: string;
  channel?: ChannelDataset['channel_id'];
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
      open: (setlist: Setlist, thumbnailUrl: string, channel?: ChannelDataset['channel_id']) => {
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

  useEffect(() => {
    console.log(drawerContext);
  }, [drawerContext]);

  return (
    <DrawerActionContext.Provider value={actions}>
      <DrawerContext.Provider value={drawerContext}>{children}</DrawerContext.Provider>
    </DrawerActionContext.Provider>
  );
}

export function useDrawerActions() {
  return use(DrawerActionContext);
}

export function useDrawer() {
  return use(DrawerContext);
}
