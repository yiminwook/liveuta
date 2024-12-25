import SearchInput from '@/components/common/input/SearchInput';
import AlertModal from '@/components/common/modal/AlertModal';
import Modal from '@/components/common/modal/Modal';
import { useTransition } from '@/hooks/useTransition';
import { ModalProps, useSetModalStore } from '@/stores/modal';
import { TScheduleDto } from '@/types/dto';
import { Button, CloseButton } from '@mantine/core';
import variable from '@variable';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import NavTab from './NavTab';
import css from './ScheduleNavModal.module.scss';
import ToggleFavorite from './ToggleFavorite';
import VideoTypeRadio from './VideoTypeRadio';

const SCHEDULE_NAV_MODAL_ID = 'scheduleNavModal';

type ScheduleNavModalProps = {
  scheduleDto: TScheduleDto;
  length: {
    all: number;
    stream: number;
    video: number;
  };
};

export default function ScheduleNavModal({
  onClose,
  scheduleDto,
  length,
}: ModalProps<ScheduleNavModalProps>) {
  const session = useSession();
  const [query, setQuery] = useState(scheduleDto.query);
  const searchParams = useSearchParams();
  const { modifier, onAnimationEnd, exit } = useTransition();
  const modalActions = useSetModalStore();
  const router = useRouter(); // transition 효과 제외

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(() => e.target.value);
  };

  const onResetSearch = async () => {
    const result: true | undefined = await modalActions.push(AlertModal, {
      id: 'reset-schedule-query',
      props: {
        message: '검색 필터링을 초기화하시겠습니까?',
      },
    });

    if (!result) return;
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    router.push(`/schedule?${params.toString()}`);
  };

  const onSearch = () => {
    const trimmedQuery = query.trim();
    const params = new URLSearchParams(searchParams);
    params.set('q', trimmedQuery);
    router.push(`/schedule?${params.toString()}`);
  };

  const onClickFavorite = () => {
    const query = new URLSearchParams(searchParams);
    query.set('isFavorite', String(!scheduleDto.isFavorite));
    router.push(`/schedule?${query.toString()}`);
  };

  const onCloseWithExit = () => {
    exit(() => onClose());
  };

  return (
    <Modal
      id={SCHEDULE_NAV_MODAL_ID}
      className={classNames(modifier)}
      onClose={onCloseWithExit}
      onAnimationEnd={onAnimationEnd}
      width={750}
      withCloseButton={false}
    >
      <div className={css.content}>
        <div className={css.contentHeader}>
          <div className={css.navTabBox}>
            {session.data && (
              <ToggleFavorite isFavorite={scheduleDto.isFavorite} onClick={onClickFavorite} />
            )}
            <NavTab />
          </div>
          <CloseButton w={40} h={40} onClick={onCloseWithExit} />
        </div>

        <div className={css.searchBox}>
          {searchParams.get('q') && (
            <div className={css.queryStatBox}>
              <FaFilter size="1rem" color={variable.thirdColorDefault} />
              <span>검색 필터링 중:&nbsp;{searchParams.get('q')}</span>
              <Button variant="light" size="xs" fz={14} onClick={onResetSearch}>
                초기화
              </Button>
            </div>
          )}

          <SearchInput
            placeholder="채널명으로 검색"
            value={query}
            onChange={onChangeQuery}
            onEnterPress={onSearch}
          />
        </div>

        <div className={css.vidioTypeBox}>
          <VideoTypeRadio select={scheduleDto.select} length={length} />
        </div>
      </div>
    </Modal>
  );
}
