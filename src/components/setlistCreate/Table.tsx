import { useTranslations } from 'next-intl';
import css from './Table.module.scss';
import TableBody from './TableBody';
import { CheckAll, TableHeadActions } from './TableHeadActions';

export default function Table() {
  const t = useTranslations('setlistCreate.table');

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
            <div className={css.headTime}>{t('headCellTime')}</div>
          </th>
          <th className={css.headValue}>{t('headCellValue')}</th>
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
