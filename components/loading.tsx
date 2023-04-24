import Image from 'next/image';
import loading from '@/styles/loading.module.scss';
import { AiOutlineLoading } from 'react-icons/ai';

const Loading = () => {
  return (
    <div className={loading['loading']}>
      <div>
        <div style={{ border: 'none' }}>
          <Image
            src="/loading.png"
            width={100}
            height={100}
            alt="loading_img"
            style={{ border: 'none' }}
            unoptimized
            priority
          />
          <AiOutlineLoading size={130} color={'inherit'} />
        </div>
        <h2>Loading Now!</h2>
      </div>
    </div>
  );
};

export default Loading;
