import Image from 'next/image';
import loading from '@/styles/loading.module.scss';

const Loading = () => {
  return (
    <div className={loading['loading']}>
      <div style={{ border: 'none' }}>
        <Image src="/utawaku.png" width={100} height={100} alt="loading_img" unoptimized />
        <div>Loading Now!</div>
      </div>
    </div>
  );
};

export default Loading;
