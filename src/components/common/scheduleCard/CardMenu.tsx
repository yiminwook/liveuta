import { ActionIcon, CopyButton, Menu } from '@mantine/core';
import variable from '@variable';
import { toast } from 'sonner';
import FasStar from '~icons/fa-solid/star.jsx';
import IonPlus from '~icons/ion/plus.jsx';
import MsOpenInNew from '~icons/material-symbols/open-in-new.jsx';
import MdiBlock from '~icons/mdi/block.jsx';
import TbBellRingingFilled from '~icons/tabler/bell-ringing-filled.jsx';
import TbCheck from '~icons/tabler/check.jsx';
import TbCopy from '~icons/tabler/copy.jsx';
import TbDots from '~icons/tabler/dots.jsx';
import css from './CardMenu.module.scss';

type CardMenuProps = {
  isFavorite?: boolean;
  copyValue: string;
  onClickFavorite: () => void;
  onClickBlock: () => void;
  onClickAlarm: () => void;
  onClickNewTab: () => void;
  onClickAddMultiView: () => void;
};

export default function CardMenu({
  isFavorite = false,
  copyValue,
  onClickAddMultiView,
  onClickAlarm,
  onClickBlock,
  onClickFavorite,
  onClickNewTab,
}: CardMenuProps) {
  return (
    <Menu position="bottom-end" withArrow withinPortal arrowPosition="center" trigger="hover">
      <Menu.Target>
        <ActionIcon radius="lg" size={25}>
          <TbDots style={{ width: '25px', height: '25px' }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className={css.dropdown}>
        <Menu.Item
          component="button"
          leftSection={<TbBellRingingFilled color={variable.thirdColorDefault} />}
          onClick={onClickAlarm}
        >
          알림설정
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<IonPlus color={variable.thirdColorDefault} />}
          onClick={onClickAddMultiView}
        >
          멀티뷰추가
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<FasStar color={isFavorite ? '#ffbb00' : '#a7a7a7'} />}
          onClick={onClickFavorite}
        >
          {`즐겨찾기 ${isFavorite ? '해제' : '추가'}`}
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<MdiBlock color={variable.thirdColorDefault} />}
          onClick={onClickBlock}
        >
          채널블럭
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<MsOpenInNew color={variable.thirdColorDefault} />}
          onClick={onClickNewTab}
        >
          새로열기
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
                toast.info('링크가 복사되었습니다.');
              }}
            >
              링크복사
            </Menu.Item>
          )}
        </CopyButton>
      </Menu.Dropdown>
    </Menu>
  );
}
