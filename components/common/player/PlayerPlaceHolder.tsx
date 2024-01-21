import { PlayerPlaceholderBox } from '@/components/common/player/Style';
import Image from 'next/image';

const PlayerPlaceHolder = () => {
  return (
    <PlayerPlaceholderBox>
      <Image src={'/assets/icon-384-384.png'} alt="pip모드가 실행중입니다." width={384} height={384} />
      <p>현재 PIP 모드가 실행중입니다.</p>
    </PlayerPlaceholderBox>
  );
};

export default PlayerPlaceHolder;
