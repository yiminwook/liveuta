'use client';
import For from '@/components/common/utils/For';
import { useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import IonIosSearch from '@icons/ion/IosSearch';
import TablerX from '@icons/tabler/X';
import { ActionIcon, Modal, Tooltip } from '@mantine/core';
import { Command } from 'cmdk';
import { memo, useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import css from './CommandMenu.module.scss';
import { useCmd, useCmdActions } from './Context';

function CommandMenuComponent({ locale }: { locale: TLocaleCode }) {
  const { t } = useTranslations(locale);
  const { cmdGroups } = useCmd();
  const { setCmdOpen } = useCmdActions();

  const closeCmd = useCallback(() => setCmdOpen(false), []);

  return (
    <Command label="Command Menu" className={css.wrap}>
      <div className={css.header}>
        <div className={css.inputWrap}>
          <IonIosSearch className={css.icon} />
          <Command.Input className={css.input} placeholder={t('global.command.inputPlaceholder')} />
        </div>
        <Tooltip label={t('global.command.close')}>
          <ActionIcon variant="ghost" size="lg" onClick={closeCmd}>
            <TablerX />
          </ActionIcon>
        </Tooltip>
      </div>
      <Command.List>
        <Command.Empty>{t('global.command.empty')}</Command.Empty>
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

export default function CommandMenu({ locale }: { locale: TLocaleCode }) {
  const { cmdOpen } = useCmd();
  const { setCmdOpen } = useCmdActions();

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
        <CommandMenuMemo locale={locale} />
      </div>
    </Modal>
  );
}
