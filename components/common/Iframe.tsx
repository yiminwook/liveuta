import iframe from '@/styles/common/iframe.module.scss';
import { openWindow } from '@/utils/windowEvent';

export interface IframeProps {
  url: string;
}

const Iframe = ({ url }: IframeProps) => {
  return (
    <section className={iframe['iframe']}>
      <div>
        <iframe id="liveuta-iframe" src={url} />
      </div>
      <button onClick={() => openWindow(url)}>새 탭에서 열기</button>
    </section>
  );
};

export default Iframe;
