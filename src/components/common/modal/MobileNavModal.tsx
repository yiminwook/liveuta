import { ModalBaseProps } from '@/libraries/modal/ModalController';
import Modal from './Modal';
import * as styles from './mobileNavModal.css';
import NavTab from '@/components/schedule/NavTab';
import VideoTypeRadio from '@/components/schedule//VideoTypeRadio';
import SearchInput from '@/components/common/header/SearchInput';
import { TScheduleDto } from '@/types/dto';

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
  return (
    <Modal id={MOBILE_NAV_MODAL_ID} onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.navTabBox}>
          <NavTab filter={scheduleDto.filter} />
        </div>
        <SearchInput />
        <VideoTypeRadio select={scheduleDto.select} length={length} />
      </div>
    </Modal>
  );
}
