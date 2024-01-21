import { PlayerPlaceholderBox } from '@/components/common/player/Style';
import Image from 'next/image';

const PlayerPlaceHolder = () => {
  return (
    <PlayerPlaceholderBox>
      <div>
        <Image src={'/assets/icon-384-384.png'} alt="pip모드가 실행중입니다." unoptimized fill />
      </div>
      <p>현재 PIP 모드가 실행중입니다.</p>
    </PlayerPlaceholderBox>
  );
};

export default PlayerPlaceHolder;
