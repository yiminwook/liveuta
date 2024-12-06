import AutoSync from './AutoSync';
import ThemeSelect from './ThemeSelect';
import Background from '@/components/common/Background';
import css from './Home.module.scss';

export default function Home() {
  return (
    <Background>
      <div className={css.wrap}>
        <ThemeSelect />
        <AutoSync />
      </div>
    </Background>
  );
}
