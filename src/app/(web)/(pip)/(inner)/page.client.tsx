import Image from 'next/image';
import css from './page.module.scss';
import ChannelSlider from '@/components/home/ChannelSlider';
import ScheduleSlider from '@/components/home/ScheduleSlider';
import SearchInput from '@/components/common/header/SearchInput';

type Props = {
  coverImgUrl: string;
};

export default function Client({ coverImgUrl }: Props) {
  return (
    <main className={css.homeMain}>
      <section className={css.heroSection}>
        <div className={css.coverImageBox}>
          <Image className='blur' src={coverImgUrl} alt="blur-image" fill />
          <Image src={coverImgUrl} alt="cover-image" fill />
        </div>
      </section>

      <section className={css.liveSection}>
        <div className={css.liveNav}>
          <h2>
            현재 <span className={css.hightlight}>라이브</span> 중
          </h2>
          <a href="/live">more</a>
        </div>
        <ScheduleSlider />
      </section>

      <section className={css.favoriteSection}>
        <div className={css.favoriteNav}>
          <h2>즐겨찾기</h2>
          <a href="/favorite">more</a>
        </div>
        <ScheduleSlider />
      </section>

      <section className={css.searchSection}>
        <div className={css.searchNav}>
          <div />
          <h2>스케줄을 검색해보세요</h2>
          <a href="/schedule">more</a>
        </div>
        <div className={css.searchBox}>
          <SearchInput />
        </div>
      </section>

      <section className={css.recentChannelSection}>
        <div className={css.recentChannelNav}>
          <h2>최근 추가된 채널</h2>
          <a href="/">more</a>
        </div>
        <ChannelSlider />
      </section>

      {/* <section className={css.featureSection}>
        <div className={css.featureBox}>
          <div className={css.leftCol}></div>
          <div className={css.rightCol}>
            <div className={css.row}></div>
            <div className={css.row}></div>
            <div className={css.row}></div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
