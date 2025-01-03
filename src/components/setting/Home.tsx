import Background from '@/components/common/background/Background';
import AutoSync from './AutoSync';
import css from './Home.module.scss';
import LanguageSelect from './LanguageSelect';
import ThemeSelect from './ThemeSelect';

export default function Home() {
  return (
    <Background>
      <div className={css.wrap}>
        <ThemeSelect />
        <LanguageSelect />
        <AutoSync />
      </div>
    </Background>
  );
}
