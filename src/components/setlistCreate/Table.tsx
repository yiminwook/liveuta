import CheckAll from './CheckAll';
import css from './Table.module.scss';
import TableBody from './TableBody';
import TableHeadActions from './TableHeadActions';

export default function Table() {
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th>
            <div className={css.headCheck}>
              <CheckAll />
            </div>
          </th>
          <th>
            <div className={css.headTime}>시간</div>
          </th>
          <th className={css.headValue}>텍스트</th>
          <th>
            <div className={css.headActions}>
              <TableHeadActions />
            </div>
          </th>
        </tr>
      </thead>
      <TableBody />
    </table>
  );
}
