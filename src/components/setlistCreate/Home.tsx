import Background from '@/components/common/background/Background';
import css from './Home.module.scss';
import Player from './Player';
import SetlistControlSection from './SetlistControlSection';
import Table from './Table';
import UrlInput from './UrlInput';

export default function Home() {
  return (
    <Background>
      <div className={css.wrap}>
        <div className={css.videoSection}>
          <div className={css.videoSectionInner}>
            <UrlInput />
          </div>
          <div className={css.playerBox}>
            <Player />
          </div>
          <div className={css.videoSectionInner}>
            <SetlistControlSection />
          </div>
        </div>
        <div className={css.tableSection}>
          <Table />
        </div>
      </div>
    </Background>
  );
}
