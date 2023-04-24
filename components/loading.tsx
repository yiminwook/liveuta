import Image from 'next/image';
import loading from '@/styles/loading.module.scss';
import { AiOutlineLoading } from 'react-icons/ai';

const Loading = () => {
  return (
    <div className={loading['loading']}>
      <div style={{ border: 'none' }}>
        <div>
          <Image src="/loading.png" width={100} height={100} alt="loading_img" unoptimized />
          <AiOutlineLoading size={130} color={'inherit'} />
        </div>
        <h2>Loading Now!</h2>
      </div>
    </div>
  );
};

export default Loading;
