'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/common/Vaul';
import For from '@/components/common/utils/For';
import { Anchor, ScrollArea } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useUtilsLinksContext } from './Links';
import css from './MobileDrawer.module.scss';
import { useMobileDrawerContext } from './MobileDrawerContext';

export default function UtilsMobileDrawer() {
  const t = useTranslations('utils.sidebar');
  const { isOpen, setIsOpen } = useMobileDrawerContext();
  const links = useUtilsLinksContext();

  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="blind">
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription>{t('description')}</DrawerDescription>
        </DrawerHeader>
        <div className={css.wrap}>
          <ScrollArea className={css.scrollArea}>
            <div className={css.contents}>
              <For each={links}>
                {(group, index) => (
                  <div key={`utils-group-${index}`} className={css.group}>
                    <h3 className={css.groupTitle}>{group.text}</h3>
                    <div className={css.groupItems}>
                      <For each={group.items}>
                        {(item, itemIndex) => (
                          <Anchor
                            key={`utils-group-${index}-${itemIndex}`}
                            href={item.href}
                            className={css.item}
                          >
                            {item.text}
                          </Anchor>
                        )}
                      </For>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
