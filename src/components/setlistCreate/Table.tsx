import { useTranslations } from '@/libraries/i18n/client';
import css from './Table.module.scss';
import TableBody from './TableBody';
import { CheckAll, TableHeadActions } from './TableHeadActions';

export default function Table() {
  const { t } = useTranslations();

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
            <div className={css.headTime}>{t('setlistCreate.table.headCellTime')}</div>
          </th>
          <th className={css.headValue}>{t('setlistCreate.table.headCellValue')}</th>
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
