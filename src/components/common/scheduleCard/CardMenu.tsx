import { ActionIcon, CopyButton, Menu } from '@mantine/core';
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
          <IconTbDots style={{ width: '25px', height: '25px' }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className={css.dropdown}>
        <Menu.Item
          component="button"
          leftSection={<IconTbBellRingingFilled color={variable.thirdColorDefault} />}
          onClick={onClickAlarm}
        >
          알림설정
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<IconIonPlus color={variable.thirdColorDefault} />}
          onClick={onClickAddMultiView}
        >
          멀티뷰추가
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<IconTbStarFilled color={isFavorite ? '#ffbb00' : '#a7a7a7'} />}
          onClick={onClickFavorite}
        >
          {`즐겨찾기 ${isFavorite ? '해제' : '추가'}`}
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<IconMdiBlock color={variable.thirdColorDefault} />}
          onClick={onClickBlock}
        >
          채널블럭
        </Menu.Item>
        <Menu.Item
          component="button"
          leftSection={<IconMsOpenInNew color={variable.thirdColorDefault} />}
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
                  <IconTbCheck color="teal" />
                ) : (
                  <IconTbCopy color={variable.thirdColorDefault} />
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
