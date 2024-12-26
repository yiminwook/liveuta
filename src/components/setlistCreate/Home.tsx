import Background from '@/components/common/background/Background';
import { Divider } from '@mantine/core';
import cx from 'classnames';
import css from './Home.module.scss';
import Player from './Player';
import Table from './Table';
import UrlInput from './UrlInput';
import { AutoSort, SetlistControlButtons, SetlistItemInput } from './SetlistControlSection';

export default function Home() {
  return (
    <Background>
      <div className={css.wrap}>
        <div className={css.videoSection}>
          <div className={css.videoSectionInner}>
            <UrlInput />
          </div>
          <div className={css.playerBox}>
            <div className={css.playerWrapper}>
              <Player />
            </div>
          </div>
          <div className={cx(css.videoSectionInner, css.controlSection)}>
            <div className={css.setlistItemInputBox}>
              <SetlistItemInput />
            </div>
            <div className={css.control}>
              <div>
                <AutoSort />
              </div>
              <div className={css.buttons}>
                <SetlistControlButtons />
              </div>
            </div>
          </div>
        </div>
        <Divider orientation="vertical" className={css.verticalDivider} />
        <Divider orientation="horizontal" className={css.horizontalDivider} />
        <div className={css.tableSection}>
          <Table />
        </div>
      </div>
    </Background>
  );
}
