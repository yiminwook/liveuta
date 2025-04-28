'use client';
import For from '@/components/common/utils/For';
import { siteConfig } from '@/constants/siteConfig';
import { usePathname, useTranslations } from '@/libraries/i18n/client';
import { TLocaleCode } from '@/libraries/i18n/type';
import { useRouter, useSearchParams } from 'next/navigation';
import css from './LanguageSelect.module.scss';
import settingCss from './Setting.module.scss';

type Props = {
  locale: TLocaleCode;
};

export default function LanguageSelect({ locale }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslations();

  const onLanguageChange = (selectedLocale: TLocaleCode) => {
    if (locale === selectedLocale) return;
    router.replace(`/${selectedLocale}${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className={settingCss.wrap}>
      <h3 className={settingCss.settingLabel}>{t('settings.language.title')}</h3>
      <div className={css.languages}>
        <For each={siteConfig.locales}>
          {({ code, name }) => (
            <button
              key={code}
              className={css.languageButton}
              onClick={() => onLanguageChange(code)}
              data-active={locale === code}
            >
              <span>{name}</span>
            </button>
          )}
        </For>
      </div>
      <p>{t('hello')}</p>
    </div>
  );
}
