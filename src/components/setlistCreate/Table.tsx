import CheckAll from './CheckAll';
import css from './Table.module.scss';
import TableBody from './TableBody';
import TableHeadActions from './TableHeadActions';

export default function Table() {
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th className={css.headCheck}>
            <div>
              <CheckAll />
            </div>
          </th>
          <th className={css.headTime}>시간</th>
          <th>텍스트</th>
          <th>
            <TableHeadActions />
          </th>
        </tr>
      </thead>
      <TableBody />
    </table>
  );
}
