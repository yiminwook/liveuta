import { ActionIcon, CopyButton, Menu } from '@mantine/core';
import variable from '@variable';
import { Ban, Check, Copy, Ellipsis, SquareArrowOutUpRight, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from '@/libraries/i18n/client';
import css from './card-menu.module.scss';

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
    <Menu position="bottom-end" withArrow arrowPosition="center" trigger="hover" withinPortal>
      <Menu.Target>
        <ActionIcon radius="lg" size={25}>
          <Ellipsis />
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
          leftSection={
            <Star
              color={isFavorite ? '#ffbb00' : '#a7a7a7'}
              fill={isFavorite ? '#ffbb00' : '#a7a7a7'}
            />
          }
          onClick={onClickFavorite}
        >
          {`${t('schedule.scheduleCard.cardMenu.favorite')} ${isFavorite ? t('schedule.scheduleCard.cardMenu.remove') : t('schedule.scheduleCard.cardMenu.add')}`}
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<Ban color={variable.thirdColorDefault} />}
          onClick={onClickBlock}
        >
          {t('schedule.scheduleCard.cardMenu.blockChannel')}
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<SquareArrowOutUpRight color={variable.thirdColorDefault} />}
          onClick={onClickNewTab}
        >
          {t('schedule.scheduleCard.cardMenu.openInNewTab')}
        </Menu.Item>
        <CopyButton value={copyValue}>
          {({ copied, copy }) => (
            <Menu.Item
              component="button"
              leftSection={
                copied ? <Check color="teal" /> : <Copy color={variable.thirdColorDefault} />
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
