import { useTranslations } from '@/libraries/i18n/client';
import { ActionIcon, CopyButton, Menu } from '@mantine/core';
import {
  IconCheck,
  IconCopy,
  IconDots,
  IconExternalLink,
  IconForbid2,
  IconStarFilled,
} from '@tabler/icons-react';
import variable from '@variable';
import { toast } from 'sonner';
import css from './CardMenu.module.scss';

type CardMenuProps = {
  isFavorite?: boolean;
  copyValue: string;
  onClickFavorite: () => void;
  onClickBlock: () => void;
  onClickAlarm: () => void;
  onClickNewTab: () => void;
};

export default function CardMenu({
  isFavorite = false,
  copyValue,
  onClickAlarm,
  onClickBlock,
  onClickFavorite,
  onClickNewTab,
}: CardMenuProps) {
  const { t } = useTranslations();

  return (
    <Menu position="bottom-end" withArrow withinPortal arrowPosition="center" trigger="hover">
      <Menu.Target>
        <ActionIcon radius="lg" size={25}>
          <IconDots size="25px" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className={css.dropdown}>
        {/* <Menu.Item
          component="button"
          leftSection={<TbBellRingingFilled color={variable.thirdColorDefault} />}
          onClick={onClickAlarm}
        >
          {t('setNotification')}
        </Menu.Item> */}
        <Menu.Item
          component="button"
          leftSection={<IconStarFilled color={isFavorite ? '#ffbb00' : '#a7a7a7'} />}
          onClick={onClickFavorite}
        >
          {`${t('schedule.scheduleCard.cardMenu.favorite')} ${isFavorite ? t('schedule.scheduleCard.cardMenu.remove') : t('schedule.scheduleCard.cardMenu.add')}`}
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<IconForbid2 color={variable.thirdColorDefault} />}
          onClick={onClickBlock}
        >
          {t('schedule.scheduleCard.cardMenu.blockChannel')}
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<IconExternalLink color={variable.thirdColorDefault} />}
          onClick={onClickNewTab}
        >
          {t('schedule.scheduleCard.cardMenu.openInNewTab')}
        </Menu.Item>
        <CopyButton value={copyValue}>
          {({ copied, copy }) => (
            <Menu.Item
              component="button"
              leftSection={
                copied ? (
                  <IconCheck color="teal" />
                ) : (
                  <IconCopy color={variable.thirdColorDefault} />
                )
              }
              onClick={() => {
                copy();
                toast.info(t('schedule.scheduleCard.cardMenu.linkCopied'));
              }}
            >
              {t('schedule.scheduleCard.cardMenu.copyLink')}
            </Menu.Item>
          )}
        </CopyButton>
      </Menu.Dropdown>
    </Menu>
  );
}
