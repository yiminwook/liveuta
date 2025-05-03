import Background from '@/components/common/background/Background';
import { TLocaleCode } from '@/libraries/i18n/type';
import AutoSync from './AutoSync';
import css from './Home.module.scss';
import LanguageSelect from './LanguageSelect';
import ThemeSelect from './ThemeSelect';

type Props = {
  locale: TLocaleCode;
};

export default function Home({ locale }: Props) {
  return (
    <Background>
      <div className={css.wrap}>
        <ThemeSelect />
        <LanguageSelect locale={locale} />
        <AutoSync />
      </div>
    </Background>
  );
}
