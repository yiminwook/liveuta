import css from './Player.module.scss';

/** player가 fixed가 되었을때 높이를 대신 채워주는 역할 */
export function DefaultPlayerPlaceholder() {
  return <div className={css.defaultPlayerPlaceholder} />;
}
