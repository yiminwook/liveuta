import css from './Background.module.scss';

type TileProps = {};

export default function Tile({}: TileProps) {
  return <div className={css.tile} />;
}
