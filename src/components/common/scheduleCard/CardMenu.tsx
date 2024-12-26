import { ActionIcon, CopyButton, Menu } from '@mantine/core';
import { IconCheck, IconCopy, IconDots } from '@tabler/icons-react';
import variable from '@variable';
import { FaPlus, FaStar } from 'react-icons/fa6';
import { HiBellAlert } from 'react-icons/hi2';
import { MdBlock, MdOpenInNew } from 'react-icons/md';
import { toast } from 'sonner';

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
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component="button"
          leftSection={<HiBellAlert color={variable.thirdColorDefault} size="1.2rem" />}
          onClick={onClickAlarm}
        >
          알림설정
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<FaPlus color={variable.thirdColorDefault} size="1.2rem" />}
          onClick={onClickAddMultiView}
        >
          멀티뷰추가
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
          채널블럭
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<MdOpenInNew color={variable.thirdColorDefault} size="1.2rem" />}
          onClick={onClickNewTab}
        >
          새로열기
        </Menu.Item>
        <CopyButton value={copyValue}>
          {({ copied, copy }) => (
            <Menu.Item
              component="button"
              leftSection={
                copied ? (
                  <IconCheck color="teal" size="1.2rem" />
                ) : (
                  <IconCopy color={variable.thirdColorDefault} size="1.2rem" />
                )
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
