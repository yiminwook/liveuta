import classnames from 'classnames';
import css from './Background.module.scss';

type BackgroundProps = {
  tile?: boolean;
  children: React.ReactNode;
  expand?: boolean;
};

export default function Background({ children, expand = false, tile = false }: BackgroundProps) {
  return (
    <>
      <div className={classnames(css.sideBg, 'left')} />
      <div className={classnames(css.sideBg, 'right')} />
      <main className={classnames(css.main, { tile }, { expand })}>{children}</main>
    </>
  );
}
