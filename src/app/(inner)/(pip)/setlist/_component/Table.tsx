import { Setlist } from '@/model/oracleDB/setlist/service';
import Row from './Row';
import * as styles from './table.css';
import cx from 'classnames';

interface TableProps {
  data: Setlist[];
}

export default function Table({ data }: TableProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={cx(styles.headerCell, 'flex3')}>URL</div>
        <div className={cx(styles.headerCell, 'flex2')}>Setlist</div>
        <div className={styles.headerCell}>작성일</div>
        <div className={styles.headerCell}>업데이트</div>
      </div>
      <div className={styles.body}>
        {data.map((data) => (
          <Row key={data.videoId} data={data} />
        ))}
      </div>
    </div>
  );
}
