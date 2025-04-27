import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { TYChannelsData } from '@/types/api/youtube';
import FasStar from '@icons/fa-solid/Star';
import MdiBlock from '@icons/mdi/Block';
import variable from '@variable';
import Image from 'next/image';
import css from './RankingTable.module.scss';

type Props = {
  title: string;
  data: TYChannelsData[];
  onFavorite: (content: TYChannelsData) => void;
  onBlock: (content: TYChannelsData) => void;
};

export default function RankingTable({ title, data, onFavorite, onBlock }: Props) {
  const locale = useLocale();
  const { t } = useTranslations(locale);

  return (
    <div className={css.container}>
      <h2 className={css.title}>{title}</h2>
      <div className={css.tableWrapper}>
        {data.map((content, index) => (
          <div key={content.uid} className={css.row} data-index={index + 1}>
            <div className={css.rank}>{index + 1 + '.'}</div>
            <div className={css.thumbnail}>
              <Image
                src={content.snippet?.thumbnails?.high?.url ?? '/loading.png'}
                alt={content.nameKor}
                className={css.image}
                fill
              />
            </div>
            <a target="_blank" href={content.url}>
              <div className={css.info}>
                <h3 className={css.channelTitle}>{content.snippet?.title}</h3>
                <p className={css.korTitle}>{content.nameKor}</p>
                {/* <div className={css.actions}>
                <button
                  onClick={() => onFavorite(content)}
                  className={`${css.actionBtn} ${true ? css.active : ''}`}
                >
                  <FasStar color={true ? '#ffbb00' : '#a7a7a7'} />
                </button>
                <button onClick={() => onBlock(content)} className={css.actionBtn}>
                  <MdiBlock color={variable.thirdColorDefault} />
                </button>
              </div> */}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
