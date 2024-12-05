import { ModalBaseProps } from '@/libraries/modal/ModalController';
import Modal from './Modal';
import * as styles from './mobileNavModal.css';
import NavTab from '@/components/schedule/NavTab';
import VideoTypeRadio from '@/components/schedule//VideoTypeRadio';
import SearchInput from '@/components/common/header/SearchInput';
import { TScheduleDto } from '@/types/dto';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(() => e.target.value);
  };

  const onSearch = () => {
    const trimmedQuery = query.trim();
    const params = new URLSearchParams(searchParams);
    params.set('q', trimmedQuery);
    router.push(`/schedule?${params.toString()}`);
  };

  return (
    <Modal id={MOBILE_NAV_MODAL_ID} onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.navTabBox}>
          <NavTab filter={scheduleDto.filter} />
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
