'use client';
import { siteConfig } from '@/constants/siteConfig';
import { useAutoSync } from '@/hooks/useStorage';
import { useLocale, useTranslations } from '@/libraries/i18n/client';
import { Radio, Switch } from '@mantine/core';
import css from './AutoSync.module.scss';
import settingCss from './Setting.module.scss';

export default function AutoSync() {
  const locale = useLocale();
  const { t } = useTranslations(locale);
  const { isActive, setIsActive, refreshInterval, setRefreshInterval } = useAutoSync();

  return (
    <div className={settingCss.wrap}>
      <label className={settingCss.settingLabel} htmlFor="auto-sync">
        {t('settings.autoSync.title')}
      </label>
      <div className={css.content}>
        <Switch
          id="auto-sync"
          size="lg"
          checked={isActive}
          onChange={(e) => setIsActive(e.currentTarget.checked)}
          onLabel={t('settings.autoSync.onLabel')}
          offLabel={t('settings.autoSync.offLabel')}
        />
        <div className={css.autoSyncOn} data-show={isActive}>
          <div className={css.autoSyncSubSetting}>
            <label className={settingCss.settingLabel}>
              {t('settings.autoSync.refreshInterval')}
            </label>
            <div className={css.autoSyncRefreshInterval}>
              {siteConfig.refreshIntervalOptions.map((interval) => (
                <Radio
                  key={interval}
                  label={`${interval}${t('settings.autoSync.unit')}`}
                  value={interval}
                  checked={refreshInterval === interval}
                  onChange={(e) => setRefreshInterval(Number(e.currentTarget.value))}
                  classNames={{
                    label: css.autoSyncRefreshIntervalLabel,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
