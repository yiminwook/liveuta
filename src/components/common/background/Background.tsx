import clsx from 'clsx';
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
      <main className={clsx(css.main, 'view-swap')}>{children}</main>
    </>
  );
}
