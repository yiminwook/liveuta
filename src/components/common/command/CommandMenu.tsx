'use client';
import For from '@/components/common/utils/For';
import IonIosSearch from '@icons/ion/IosSearch';
import TablerX from '@icons/tabler/X';
import { ActionIcon, Input, Modal, Tooltip } from '@mantine/core';
import { Command } from 'cmdk';
import { useTranslations } from 'next-intl';
import { memo, useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import css from './CommandMenu.module.scss';
import { useCommand, useCommandActions } from './Context';

function CommandMenuComponent() {
  const t = useTranslations('global.command');
  const { cmdGroups } = useCommand();
  const { setCmdOpen } = useCommandActions();

  const closeCmd = useCallback(() => setCmdOpen(false), []);

  return (
    <Command label="Command Menu" className={css.wrap}>
      <div className={css.header}>
        <div className={css.inputWrap}>
          <IonIosSearch className={css.icon} />
          <Command.Input className={css.input} placeholder={t('inputPlaceholder')} />
        </div>
        <Tooltip label={t('close')}>
          <ActionIcon variant="ghost" size="lg" onClick={closeCmd}>
            <TablerX />
          </ActionIcon>
        </Tooltip>
      </div>
      <Command.List>
        <Command.Empty>{t('empty')}</Command.Empty>
        <For each={cmdGroups}>
          {(group, groupIndex) => (
            <Command.Group
              key={`command-group-${groupIndex}`}
              className={css.group}
              heading={group.heading}
            >
              <For each={group.commands}>
                {(cmd, cmdIndex) => (
                  <Command.Item
                    key={`command-item-${groupIndex}-${cmdIndex}`}
                    onSelect={() => {
                      cmd.fn();
                      closeCmd();
                    }}
                    className={css.item}
                    keywords={cmd.keywords}
                  >
                    <span>{cmd.title}</span>
                  </Command.Item>
                )}
              </For>
            </Command.Group>
          )}
        </For>
      </Command.List>
    </Command>
  );
}

const CommandMenuMemo = memo(CommandMenuComponent);
CommandMenuMemo.displayName = 'CommandMenuItems';

export default function CommandMenu() {
  const t = useTranslations('global.command');
  const { cmdOpen } = useCommand();
  const { setCmdOpen } = useCommandActions();

  const toggleCmdOpen = useCallback(() => setCmdOpen(!cmdOpen), [cmdOpen]);

  useHotkeys<HTMLDivElement>(
    'ctrl+k, meta+k',
    toggleCmdOpen,
    {
      preventDefault: true,
    },
    {
      scopes: ['global'],
    },
  );

  const closeCmd = useCallback(() => setCmdOpen(false), []);

  return (
    <Modal opened={cmdOpen} onClose={closeCmd} centered withCloseButton={false} padding={0}>
      <div className={css.wrap}>
        <CommandMenuMemo />
      </div>
    </Modal>
  );
}
