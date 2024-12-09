import css from './Home.module.scss';
import Nav from './Nav';
import ShortsSection from './ShortsSection';

export default async function Home() {
  return (
    <div className={css.wrap}>
      <Nav />
      <ShortsSection />
    </div>
  );
}
