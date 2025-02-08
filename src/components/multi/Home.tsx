import css from './Home.module.scss';
import Nav from './Nav';
import ShortsSection from './ShortsSection';

/** desktop에서 지원되는 페이지 */
export default async function Home() {
  return (
    <div className={css.wrap}>
      <Nav />
      <ShortsSection />
    </div>
  );
}
