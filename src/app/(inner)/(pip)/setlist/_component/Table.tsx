import { Setlist } from '@/model/oracleDB/setlist/service';
import Row from './Row';
import * as styles from './table.css';
import cx from 'classnames';
import { ChannelDataset } from '@/model/mongoDB/getAllChannel';

interface TableProps {
  setlistData: Setlist[];
  channelDataset: ChannelDataset;
}

export default function Table({ setlistData, channelDataset }: TableProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={cx(styles.headerCell, 'flex2')}>썸네일</div>
        <div className={styles.headerCell}>채널명</div>
        <div className={cx(styles.headerCell, 'flex2')}>세트리</div>
        <div className={styles.headerCell}>업데이트</div>
      </div>
      <div className={styles.body}>
        {setlistData.map((data) => (
          <Row key={data.videoId} setlist={data} channel={channelDataset[data.channelId]} />
        ))}
      </div>
    </div>
  );
}
