import { Setlist } from '@/model/oracleDB/setlist/service';
import dayjs from 'dayjs';
import Text from './Text';
import { openWindow } from '@inner/_lib/windowEvent';
import * as styles from './table.css';
import cx from 'classnames';

interface RowProps {
  data: Setlist;
}
export default function Row({ data }: RowProps) {
  const url = `https://www.youtube.com/watch?v=${data.videoId}`;
  const update = dayjs(data.updatedAt).format('YYYY-MM-DD');
  const create = dayjs(data.createdAt).format('YYYY-MM-DD');

  return (
    <div className={styles.row}>
      <div className={cx(styles.cell, 'flex3')}>
        <button onClick={() => openWindow(url)}>{url}</button>
      </div>
      <div className={cx(styles.cell, 'flex2')}>
        {data.description.split('\n').map((line, index) => (
          <Text key={`${data.videoId}_row_${index}`} text={line} />
        ))}
      </div>
      <div className={styles.cell}>{update}</div>
      <div className={styles.cell}>{create}</div>
    </div>
  );
}
