import classnames from 'classnames';
import cx from 'classnames';
import css from './Background.module.scss';
import SideBackground from './SideBackground';
import Tile from './Tile';

type BackgroundProps = {
  tile?: boolean;
  children: React.ReactNode;
};

export default function Background({ children, tile = false }: BackgroundProps) {
  return (
    <>
      <SideBackground side="left" />
      <SideBackground side="right" />
      {tile && <Tile />}
      <main className={cx(classnames(css.main), 'view-swap')}>{children}</main>
    </>
  );
}
