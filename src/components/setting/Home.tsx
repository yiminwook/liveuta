import Background from '@/components/common/background/Background';
import AutoSync from './AutoSync';
import css from './Home.module.scss';
import ThemeSelect from './ThemeSelect';

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
