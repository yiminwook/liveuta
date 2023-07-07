import Image from 'next/image';
import loading from '@/components/common/Loading.module.scss';
import { AiOutlineLoading } from 'react-icons/ai';
import loadingImage from '@/public/loading.png';

const Loading = () => {
  return (
    <div className={loading['loading']}>
      <div>
        <div>
          <Image src={loadingImage} width={100} height={100} alt="loading_img" unoptimized priority />
          <AiOutlineLoading size={130} color={'inherit'} />
        </div>
        <h2>Loading Now!</h2>
      </div>
    </div>
  );
};

export default Loading;
