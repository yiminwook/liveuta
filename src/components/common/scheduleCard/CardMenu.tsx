import { ActionIcon, Menu } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import variable from '@variable';
import { FaPlus, FaStar } from 'react-icons/fa6';
import { HiBellAlert } from 'react-icons/hi2';
import { MdBlock, MdOpenInNew } from 'react-icons/md';

type CardMenuProps = {
  isFavorite?: boolean;
  onClickFavorite: () => void;
  onClickBlock: () => void;
  onClickAlarm: () => void;
  onClickNewTab: () => void;
  onClickAddMultiView: () => void;
};

export default function CardMenu({
  isFavorite = false,
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
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component="button"
          leftSection={<HiBellAlert color={variable.thirdColorDefault} size="1.2rem" />}
          onClick={onClickAlarm}
        >
          알림 설정
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<FaPlus color={variable.thirdColorDefault} size="1.2rem" />}
          onClick={onClickAddMultiView}
        >
          멀티뷰 추가
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<FaStar size="1.2rem" color={isFavorite ? '#ffbb00' : '#a7a7a7'} />}
          onClick={onClickFavorite}
        >
          {`즐겨찾기 ${isFavorite ? '해제' : '추가'}`}
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<MdBlock color={variable.thirdColorDefault} size="1.2rem" />}
          onClick={onClickBlock}
        >
          채널 블럭
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<MdOpenInNew color={variable.thirdColorDefault} size="1.2rem" />}
          onClick={onClickNewTab}
        >
          새로열기
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
