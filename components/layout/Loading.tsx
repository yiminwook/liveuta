import Image from 'next/image';
import loading from '@/components/layout/Loading.module.scss';
import { AiOutlineLoading } from 'react-icons/ai';
import loadingImage from '@/public/loading.png';
import { useAtomValue } from 'jotai';
import { isLoadingAtom } from '@/atoms';

const Loading = () => {
  const isLoading = useAtomValue(isLoadingAtom);

  if (isLoading === false) {
    return null;
  }

  return (
    <div className={loading['loading']}>
      <div>
        <div>
          <Image src={loadingImage} width={100} height={100} alt="loading_img" unoptimized priority />
          <AiOutlineLoading size={130} color="inherit" />
        </div>
        <p>Loading Now!</p>
      </div>
    </div>
  );
};

export default Loading;
