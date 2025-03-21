import FasStar from '@icons/fa-solid/Star';
import IonPlus from '@icons/ion/PlusRound';
import MsOpenInNew from '@icons/material-symbols/OpenInNew';
import MdiBlock from '@icons/mdi/Block';
import TbBellRingingFilled from '@icons/tabler/BellRingingFilled';
import TbCheck from '@icons/tabler/Check';
import TbCopy from '@icons/tabler/Copy';
import TbDots from '@icons/tabler/Dots';
import { ActionIcon, CopyButton, Menu } from '@mantine/core';
import variable from '@variable';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('schedule.scheduleCard.cardMenu');

  return (
    <Menu position="bottom-end" withArrow withinPortal arrowPosition="center" trigger="hover">
      <Menu.Target>
        <ActionIcon radius="lg" size={25}>
          <TbDots width="25px" height="25px" />
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
          leftSection={<FasStar color={isFavorite ? '#ffbb00' : '#a7a7a7'} />}
          onClick={onClickFavorite}
        >
          {`${t('favorite')} ${isFavorite ? t('remove') : t('add')}`}
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<MdiBlock color={variable.thirdColorDefault} />}
          onClick={onClickBlock}
        >
          {t('blockChannel')}
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<MsOpenInNew color={variable.thirdColorDefault} />}
          onClick={onClickNewTab}
        >
          {t('openInNewTab')}
        </Menu.Item>
        <CopyButton value={copyValue}>
          {({ copied, copy }) => (
            <Menu.Item
              component="button"
              leftSection={
                copied ? <TbCheck color="teal" /> : <TbCopy color={variable.thirdColorDefault} />
              }
              onClick={() => {
                copy();
                toast.info(t('linkCopied'));
              }}
            >
              {t('copyLink')}
            </Menu.Item>
          )}
        </CopyButton>
      </Menu.Dropdown>
    </Menu>
  );
}
