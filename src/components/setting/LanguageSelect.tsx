'use client';
import For from '@/components/common/utils/For';
import { useRouter } from '@/i18n/routing';
import { siteConfig } from '@/siteConfig';
import { LocaleCode } from '@/types/siteConfig';
import { useLocale, useTranslations } from 'next-intl';
import css from './LanguageSelect.module.scss';
import settingCss from './Setting.module.scss';

export default function LanguageSelect() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  function onLanguageChange(code: LocaleCode) {
    if (locale === code) return;

    router.replace('/setting', { locale: code });
  }

  return (
    <div className={settingCss.wrap}>
      <h3 className={settingCss.settingLabel}>언어 설정</h3>
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
