import SearchInput from '@/components/common/input/SearchInput';
import VideoTypeRadio from '@/components/schedule//VideoTypeRadio';
import NavTab from '@/components/schedule/NavTab';
import { useTransition } from '@/hooks/useTransition';
import { ModalBaseProps } from '@/libraries/modal/ModalController';
import { TScheduleDto } from '@/types/dto';
import { CloseButton } from '@mantine/core';
import classNames from 'classnames';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import css from './MobileNavModal.module.scss';
import Modal from './Modal';

const MOBILE_NAV_MODAL_ID = 'mobileNavModal';

type MobileNavModalProps = {
  scheduleDto: TScheduleDto;
  length: {
    all: number;
    stream: number;
    video: number;
  };
} & ModalBaseProps;

export default function MobileNavModal({ onClose, scheduleDto, length }: MobileNavModalProps) {
  const [query, setQuery] = useState(scheduleDto.query);
  const searchParams = useSearchParams();
  const { modifier, onAnimationEnd, exit } = useTransition();
  const router = useRouter(); // transition 효과 제외

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(() => e.target.value);
  };

  const onSearch = () => {
    const trimmedQuery = query.trim();
    const params = new URLSearchParams(searchParams);
    params.set('q', trimmedQuery);
    router.push(`/schedule?${params.toString()}`);
  };

  const onCloseWithExit = () => {
    exit(() => onClose());
  };

  return (
    <Modal
      id={MOBILE_NAV_MODAL_ID}
      className={classNames(modifier)}
      onClose={onCloseWithExit}
      onAnimationEnd={onAnimationEnd}
      width={750}
      withCloseButton={false}
    >
      <div className={css.content}>
        <div className={css.navTabBox}>
          <NavTab />
          <CloseButton w={40} h={40} onClick={onCloseWithExit} />
        </div>
        <SearchInput
          placeholder="채널명으로 검색"
          value={query}
          onChange={onChangeQuery}
          onEnterPress={onSearch}
        />
        <VideoTypeRadio select={scheduleDto.select} length={length} />
      </div>
    </Modal>
  );
}
